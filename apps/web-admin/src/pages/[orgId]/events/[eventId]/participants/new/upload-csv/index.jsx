import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button, Text, Flex, Box } from '@chakra-ui/react';
import Papa from 'papaparse';

import DashboardLayout from '@/layouts/DashboardLayout';

import DataDisplay from '@/components/DataDisplay';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';

export default function NewParticipantByCSVUpload() {
  const router = useRouter();
  const showAlert = useAlert();

  const { orgId, eventId } = router.query;
  const { loading, post } = useFetch();

  const [csvData, setCSVData] = useState(null);
  const [columns, setColumns] = useState([
    { field: 'firstName', headerName: 'First Name' },
    { field: 'lastName', headerName: 'Last Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'phone', headerName: 'Phone' },
    { field: 'checkInKey', headerName: 'Check In Key' },
  ]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,

      complete: (result) => {
        const filteredData = result.data.filter((row) => {
          return Object.values(row).every((value) => value !== null && value !== undefined);
        });

        if (filteredData[filteredData.length - 1].firstName === '') {
          showAlert({
            title: 'Error',
            description: 'Please remove the blank line at the end of the CSV file.',
            status: 'error',
            duration: 10000,
          });
          setCSVData(null);
          //e.target.value = '';
          return;
        }

        const dataWithId = filteredData.map((row, index) => ({ ...row, id: index + 1 }));

        setColumns(
          Object.keys(dataWithId[0])
            .filter((key) => key !== 'id')
            .map((key) => ({ field: key, headerName: key })),
        );

        if (
          columns.find(
            (column) =>
              column.field !== 'firstName' &&
              column.field !== 'lastName' &&
              column.field !== 'email' &&
              column.field !== 'phone' &&
              column.field !== 'checkInKey' &&
              !(column.field.startsWith('_') || column.field.startsWith('&')),
          )
        ) {
          showAlert({
            title: 'Error',
            description:
              'Extra attributes should be prefixed with an underscore (_) and extras to be checked-in should be prefixed with an asterisk (&)',
            status: 'error',
            duration: 10000,
          });
          setCSVData(null);
          //e.target.value = '';
        }

        if (
          columns.find(
            (column) =>
              column.field !== 'firstName' ||
              column.field !== 'lastName' ||
              column.field !== 'email' ||
              column.field !== 'phone' ||
              column.field !== 'checkInKey',
          )
        ) {
          showAlert({
            title: 'Info',
            description:
              'Extra columns marked with _ will be inserted as attributes and & will be inserted as extras to be checked-in.',
            status: 'info',
            duration: 10000,
          });
        }

        setCSVData(dataWithId);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  };

  //
  // Checking for underscore prefixed fields
  //
  useEffect(() => {
    if (columns.length <= 2) return;
    if (columns.find((column) => column.field === '')) {
      showAlert({
        title: 'Error',
        description: 'Please make sure that the CSV file is properly formatted.',
        status: 'error',
        duration: 10000,
      });
      setCSVData(null);
      //e.target.value = '';
      setColumns([
        { field: 'firstName', headerName: 'First Name' },
        { field: 'lastName', headerName: 'Last Name' },
        { field: 'email', headerName: 'Email' },
        { field: 'phone', headerName: 'Phone' },
        { field: 'checkInKey', headerName: 'Check In Key' },
      ]);
    } else if (
      columns.find(
        (column) =>
          column.field !== 'firstName' &&
          column.field !== 'lastName' &&
          column.field !== 'email' &&
          column.field !== 'phone' &&
          column.field !== 'checkInKey' &&
          !(column.field.startsWith('_') || column.field.startsWith('&')),
      )
    ) {
      console.log({ columns });

      showAlert({
        title: 'Error',
        description: 'Extra fields should be prefixed with an underscore (_)',
        status: 'error',
        duration: 10000,
      });
      setCSVData(null);
      // e.target.value = '';
      setColumns([
        { field: 'firstName', headerName: 'First Name' },
        { field: 'lastName', headerName: 'Last Name' },
        { field: 'email', headerName: 'Email' },
        { field: 'phone', headerName: 'Phone' },
        { field: 'checkInKey', headerName: 'Check In Key' },
      ]);
    }
  }, [columns]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, status } = await post(
      `/core/organizations/${orgId}/events/${eventId}/participants?isBulk=true`,
      {},
      {
        participants: csvData,
      },
    );
    if (status === 200) {
      showAlert({
        title: 'Success',
        description: data.message,
        status: 'success',
      });
      if (data.success) router.push(`/${orgId}/events/${eventId}/participants`);
      else console.error(data.participantsNotAdded);
    } else {
      showAlert({
        title: 'Error',
        description: data.error,
        status: 'error',
      });
    }
  };

  return (
    <DashboardLayout
      pageTitle="Upload CSV"
      previousPage={`/organizations/${orgId}/events/${eventId}/participants`}
      debugInfo={csvData}
    >
      <Box
        height="100%"
        width="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {!csvData && (
          <Text fontSize="xl">
            Upload a CSV file of participants. The required columns are firstName, lastName, phone,
            checkInKey, email. Extra attributes should be prefixed with an underscore (_) and extras
            to be checked-in should be prefixed with and ampersand (&).
          </Text>
        )}
        <Flex justifyContent="space-between" alignItems="center">
          <input type="file" accept=".csv" onChange={handleFileUpload} />
          {csvData && (
            <Button onClick={handleSubmit} isLoading={loading}>
              Confirm and Add
            </Button>
          )}
        </Flex>
        {csvData && <DataDisplay loading={loading} rows={csvData} columns={columns} />}
      </Box>
    </DashboardLayout>
  );
}
