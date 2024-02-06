import { useState } from 'react';
import Papa from 'papaparse';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { Flex } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';
import { ThemeProvider, createTheme } from '@mui/material';

const MuiTheme = createTheme({});

export default function NewOrganization() {
  const [csvData, setCSVData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const dataWithId = result.data.map((row, index) => ({ ...row, id: index + 1 }));
        setCSVData(dataWithId);
        console.log('CSV Data as JSON:', dataWithId);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  };

  const columns = [
    { field: 'FirstName', headerName: 'First Name', width: 150 },
    { field: 'LastName', headerName: 'Last Name', width: 150 },
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
      </Flex>
    </DashboardLayout>
  );
}
