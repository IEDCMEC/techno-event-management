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

import DashboardLayout from '@/layouts/DashboardLayout';
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material';
const MuiTheme = createTheme({});

export default function Members() {
  const router = useRouter();

  const { orgId } = router.query;

  const { loading, get } = useFetch();

  const [members, setMembers] = useState([]);

  const columns = [
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      valueGetter: (params) => params.row.user.email,
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 150,
      valueGetter: (params) => params.row.user.firstName || 'null',
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 150,
      valueGetter: (params) => params.row.user.lastName || 'null',
    },
    {
      field: 'role',
      headerName: 'Role',
    },
  ];

  useEffect(() => {
    const fetchmembers = async () => {
      const { data, status } = await get(`/core/organizations/${orgId}/members`);
      setMembers(data.organizationUsers || []);
    };
    fetchmembers();
  }, [orgId]);

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
          <button onClick={() => router.push(`/organizations/${orgId}/`)}>
            <BsArrowLeft style={iconStyle} />
          </button>
          <Text fontSize="4xl" fontWeight="bold">
            members
          </Text>
          <Button
            padding="4"
            minWidth="-moz-initial"
            bgColor="rgb(128, 90, 213)"
            color="white"
            _hover={{ bgColor: 'rgb(100, 70, 183)' }}
            onClick={() => {
              router.push(`/organizations/${orgId}/members/new/`);
            }}
          >
            Add Member
          </Button>
        </Box>
        <Box width="100%" height="100%">
          <ThemeProvider theme={MuiTheme}>
            <DataGrid
              rows={members}
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
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
