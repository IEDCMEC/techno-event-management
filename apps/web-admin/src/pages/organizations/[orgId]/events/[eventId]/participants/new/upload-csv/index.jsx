import { useState } from 'react';
import Papa from 'papaparse';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useFetch } from '@/hooks/useFetch';

import { useRouter } from 'next/router';
import { Flex, Button, Box, Text } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';
import { ThemeProvider, createTheme } from '@mui/material';

const MuiTheme = createTheme({});

export default function NewOrganization() {
  const { loading, post } = useFetch();
  const router = useRouter();

  const { orgId, eventId } = router.query;

  const [csvData, setCSVData] = useState(null);
  const [columns, setColumns] = useState([
    { field: 'firstName', headerName: 'First Name' },
    { field: 'lastName', headerName: 'Last Name' },
  ]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
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
              !column.field.startsWith('_'),
          )
        ) {
          alert('Extra fields should be prefixed with an underscore (_).');
        }

        if (columns.find((column) => column.field !== 'firstName' || column.field !== 'lastName')) {
          alert('The extra fields marked with _ will be inserted as attributes.');
        }

        setCSVData(dataWithId);
        console.log(dataWithId);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  };

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
      router.push(`/organizations/${orgId}/events/${eventId}/participants`);
    } else {
      alert(data.error);
    }
  };

  return (
    <DashboardLayout>
      <Flex
        direction="column"
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="start"
        gap={8}
      >
        <Box width="100%" p={8} display="flex" justifyContent="space-between">
          <Text fontSize="4xl" fontWeight="bold">
            Participants
          </Text>
        </Box>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={8}
        >
          {!csvData && (
            <Text fontSize="xl">
              Upload a CSV file of participants. The required columns are firstName, lastName. Extra
              columns should be prefixed with an underscore (_).
            </Text>
          )}
          <input type="file" accept=".csv" onChange={handleFileUpload} />
          {csvData && (
            <>
              <ThemeProvider theme={MuiTheme}>
                <DataGrid
                  rows={csvData}
                  columns={columns}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true,
                      quickFilterProps: { debounceMs: 500 },
                    },
                  }}
                  slots={{
                    toolbar: GridToolbar,
                  }}
                  autoHeight
                />
              </ThemeProvider>
              <Button onClick={handleSubmit} isLoading={loading}>
                Confirm and Add
              </Button>
            </>
          )}
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
