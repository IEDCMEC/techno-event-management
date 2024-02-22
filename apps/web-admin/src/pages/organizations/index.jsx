import { useRouter } from 'next/router';
import { BsArrowLeft } from 'react-icons/bs';
import {
  Box,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  TableContainer,
  Text,
  Button,
} from '@chakra-ui/react';

import { useFetch } from '@/hooks/useFetch';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material';
const MuiTheme = createTheme({});

import DashboardLayout from '@/layouts/DashboardLayout';
import { useEffect, useState } from 'react';

export default function Organizations() {
  const router = useRouter();

  const { orgId } = router.query;

  const { loading, get } = useFetch();

  const [organizations, setOrganizations] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <div
          onClick={() => {
            router.push(`/organizations/${params.row.id}`);
          }}
          style={{ cursor: 'pointer' }}
        >
          {params.value}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchOrganizations = async () => {
      const { data, status } = await get('/core/organizations');
      setOrganizations(data.organizations || []);
    };
    fetchOrganizations();
  }, []);

  const iconStyle = {
    fontSize: '45px', // Adjust the size as needed
    marginTop: '8px',
  };
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
        <Box width="100%" p={8} display="flex" justifyContent="space-between">
          <button>
            <BsArrowLeft style={iconStyle} />
          </button>
          <Text fontSize="4xl" fontWeight="bold">
            Organizations
          </Text>
          <Button
            padding="4"
            minWidth="-moz-initial"
            bgColor="rgb(128, 90, 213)"
            color="white"
            _hover={{ bgColor: 'rgb(100, 70, 183)' }}
            onClick={() => {
              router.push('organizations/new');
            }}
          >
            Add Organization
          </Button>
        </Box>
        <Box width="100%" height="100%">
          <ThemeProvider theme={MuiTheme}>
            <DataGrid
              rows={organizations}
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
              sx={{
                // disable cell selection style
                '.MuiDataGrid-cell:focus': {
                  outline: 'none',
                },
                // pointer cursor on ALL rows
                '& .MuiDataGrid-row:hover': {
                  cursor: 'pointer',
                },
              }}
              onRowClick={(row) => {
                router.push(`/organizations/${row.id}/`);
              }}
            />
          </ThemeProvider>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
