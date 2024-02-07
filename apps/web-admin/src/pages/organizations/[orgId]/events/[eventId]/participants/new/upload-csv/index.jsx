import { useState } from 'react';
import Papa from 'papaparse';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useFetch } from '@/hooks/useFetch';

import { useRouter } from 'next/router';
import { Flex, Button } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';
import { ThemeProvider, createTheme } from '@mui/material';

const MuiTheme = createTheme({});

export default function NewOrganization() {
  const { loading, post } = useFetch();
  const router = useRouter();

  const { orgId, eventId } = router.query;

  const [csvData, setCSVData] = useState(null);

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
        setCSVData(dataWithId);
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

  const columns = [
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
  ];

  return (
    <DashboardLayout>
      <Flex
        direction="column"
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        gap={8}
      >
        <div>
          <h1>CSV Uploader</h1>
          <input type="file" accept=".csv" onChange={handleFileUpload} />
          {csvData && (
            <ThemeProvider theme={MuiTheme}>
              <DataGrid
                rows={csvData}
                columns={columns}
                components={{
                  Toolbar: GridToolbar,
                }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,

                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                autoHeight
              />
            </ThemeProvider>
          )}
        </div>
        <Button onClick={handleSubmit}>Confirm and Add</Button>
      </Flex>
    </DashboardLayout>
  );
}
