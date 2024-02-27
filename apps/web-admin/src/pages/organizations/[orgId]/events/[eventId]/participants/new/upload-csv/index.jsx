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
  ]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      dynamicTyping: (field) => {
        // Keep 'phone' field as string
        if (field === 'phone') return false;
        // Convert other fields
        return true;
      },
      complete: (result) => {
        const filteredData = result.data.filter((row) => {
          return Object.values(row).every((value) => value !== null && value !== undefined);
        });

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
        }

        if (
          columns.find(
            (column) =>
              column.field !== 'firstName' ||
              column.field !== 'lastName' ||
              column.field !== 'email' ||
              column.field !== 'phone',
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
    if (
      columns.find(
        (column) =>
          column.field !== 'firstName' &&
          column.field !== 'lastName' &&
          column.field !== 'email' &&
          column.field !== 'phone' &&
          !(column.field.startsWith('_') || column.field.startsWith('&')),
      )
    ) {
      showAlert({
        title: 'Error',
        description: 'Extra fields should be prefixed with an underscore (_)',
        status: 'error',
        duration: 10000,
      });
      setCSVData(null);
      setColumns([
        { field: 'firstName', headerName: 'First Name' },
        { field: 'lastName', headerName: 'Last Name' },
        { field: 'email', headerName: 'Email' },
        { field: 'phone', headerName: 'Phone' },
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
        description: 'Participants have been added successfully.',
        status: 'success',
      });
      router.push(`/organizations/${orgId}/events/${eventId}/participants`);
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
            Upload a CSV file of participants. The required columns are firstName, lastName , phone
            , email. Extra attributes should be prefixed with an underscore (_) and extras to be
            checked-in should be prefixed with and ampersand (&).
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
