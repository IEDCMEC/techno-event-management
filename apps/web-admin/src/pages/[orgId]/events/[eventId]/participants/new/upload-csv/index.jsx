import { useRouter } from 'next/router';
import { useEffect,useState } from 'react';
import { Text, Flex, Box, useColorMode } from '@chakra-ui/react';
import Papa from 'papaparse';

import DashboardLayout from '@/layouts/DashboardLayout';

import DataDisplay from '@/components/DataDisplay';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';
import { StyledText, StyledButton } from '@/components/ui/StyledComponents';
import { inter } from '@/components/ui/fonts';

export default function NewParticipantByCSVUpload() {
  const { colorMode } = useColorMode();
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
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: 'greedy', // Fixes empty line issues
      complete: (result) => {
        if (result.errors.length > 0) {
          showAlert({
            title: 'Error',
            description: 'CSV parsing error. Please check the file format.',
            status: 'error',
            duration: 10000,
          });
          e.target.value = '';
          return;
        }

        if (result.data.length === 0) {
          showAlert({
            title: 'Error',
            description: 'The CSV file appears to be empty.',
            status: 'error',
            duration: 10000,
          });
          e.target.value = '';
          return;
        }

        // Get headers from first row
        const headers = Object.keys(result.data[0]);

        // Check required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'checkInKey'];
        const missingColumns = requiredFields.filter((field) => !headers.includes(field));

        if (missingColumns.length > 0) {
          showAlert({
            title: 'Error',
            description: `Missing required columns: ${missingColumns.join(', ')}`,
            status: 'error',
            duration: 10000,
          });
          e.target.value = '';
          return;
        }

        // Check extra columns format
        const invalidColumns = headers.filter(
          (header) =>
            !requiredFields.includes(header) && !header.startsWith('_') && !header.startsWith('&'),
        );

        if (invalidColumns.length > 0) {
          showAlert({
            title: 'Error',
            description: `Extra columns must start with _ or &: ${invalidColumns.join(', ')}`,
            status: 'error',
            duration: 10000,
          });
          e.target.value = '';
          return;
        }

        const dataWithId = result.data.map((row, index) => ({
          id: index + 1,
          ...row,
        }));

        // Update columns for display
        const newColumns = headers.map((header) => ({
          field: header,
          headerName:
            header.startsWith('_') || header.startsWith('&')
              ? header.slice(1)
              : header.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
        }));

        setColumns(newColumns);
        setCSVData(dataWithId);

        // Show info about extra columns
        const extraColumns = headers.filter((h) => h.startsWith('_') || h.startsWith('&'));
        if (extraColumns.length > 0) {
          showAlert({
            title: 'Info',
            description:
              'Extra columns detected. Using _ for attributes and & for check-in extras.',
            status: 'info',
            duration: 5000,
          });
        }
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        showAlert({
          title: 'Error',
          description: 'Failed to parse CSV file',
          status: 'error',
          duration: 10000,
        });
        e.target.value = '';
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
      //console.log({ columns });

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
    if (!csvData || csvData.length === 0) {
      showAlert({
        title: 'Error',
        description: 'No data to submit',
        status: 'error',
      });
      return;
    }

    try {
      const { data, status } = await post(
        `/core/organizations/${orgId}/events/${eventId}/participants?isBulk=true`,
        {},
        { participants: csvData }
      );

      if (status === 200) {
        showAlert({
          title: 'Success',
          description: data.message || 'Participants added successfully',
          status: 'success',
        });
        if (data.success) {
          router.push(`/${orgId}/events/${eventId}/participants`);
        } else {
          console.error('Some participants not added:', data.participantsNotAdded);
          showAlert({
            title: 'Warning',
            description: 'Some participants could not be added. Check console for details.',
            status: 'warning',
          });
        }
      } else {
        throw new Error(data.error || 'Failed to add participants');
      }
    } catch (error) {
      showAlert({
        title: 'Error',
        description: error.message || 'Failed to submit participants',
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
      <Box height="100%" width="100%" display="flex" flexDirection="column" p={4}>
        {!csvData && (
          <Box textAlign="center">
            <Text fontFamily={inter.style.fontFamily} fontSize="2xl" fontWeight="800">
              Upload a CSV file with participant details
            </Text>

            <Box mt="4" display="flex" flexDirection="column" textAlign="left">
              <Text fontFamily={inter.style.fontFamily} fontSize="lg" fontWeight={600}>
                Required Columns:
              </Text>
              <Text
                fontFamily={inter.style.fontFamily}
                fontSize="lg"
                color={colorMode === 'light' ? 'gray.600' : 'gray.100'}
              >
                firstName, lastName, email, phone, checkInKey
              </Text>
            </Box>

            <Box mt="6" display="flex" flexDirection="column" textAlign="left">
              <Text fontFamily={inter.style.fontFamily} fontSize="lg" fontWeight={600}>
                Additional Attributes:
              </Text>
              <Text
                fontFamily={inter.style.fontFamily}
                fontSize="lg"
                color={colorMode === 'light' ? 'gray.600' : 'gray.100'}
              >
                Prefix extra attributes with underscore (_) and check-in attributes with ampersand
                (&)
              </Text>
            </Box>
          </Box>
        )}

        <Flex justifyContent="center" alignItems="center" mt={8}>
          <StyledButton position="relative" overflow="hidden">
            <StyledText>Upload CSV</StyledText>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              style={{
                position: 'absolute',
                opacity: 0,
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                top: 0,
                left: 0,
              }}
            />
          </StyledButton>
        </Flex>

        {csvData && (
          <Flex justifyContent="flex-start" mt={4}>
            <StyledButton onClick={handleSubmit} isLoading={loading}>
              Confirm and Add
            </StyledButton>
          </Flex>
        )}

        {csvData && <DataDisplay loading={loading} rows={csvData} columns={columns} />}
      </Box>
    </DashboardLayout>
  );
}
