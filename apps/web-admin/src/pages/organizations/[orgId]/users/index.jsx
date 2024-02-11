import { useRouter } from 'next/router';

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
  const handleClick = () => {
    router.push(`/organizations/${orgId}/members/new/`);
  };
  const handleRowClick = (row) => {
    router.push(`/organizations/${orgId}/events/${row.id}`);
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'email', headerName: 'email', width: 150 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => <div style={{ cursor: 'pointer' }}>{params.value}</div>,
    },
  ];

  useEffect(() => {
    const fetchmembers = async () => {
      const { data, status } = await get(`/core/organizations/${orgId}/members`);
      setMembers(data.users || []);
      console.log(data);
    };
    fetchmembers();
  }, [orgId]);

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
          <Text fontSize="4xl" fontWeight="bold">
            members
          </Text>
          <Button
            padding="4"
            minWidth="-moz-initial"
            bgColor="rgb(128, 90, 213)"
            color="white"
            _hover={{ bgColor: 'rgb(100, 70, 183)' }}
            onClick={handleClick}
          >
            Add Event
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
          {/*<TableContainer width="100%" height="100%">
            <Table variant="simple">
              <TableCaption>members</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {members.map((event) => (
                  <Tr
                    key={event?.id}
                    onClick={() => {
                      router.push(`/organizations/${orgId}/members/${event?.id}`);
                    }}
                    cursor="pointer"
                  >
                    <Td>{event?.id}</Td>
                    <Td>{event?.name}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>{members.length} members</Th>
                </Tr>
              </Tfoot>
            </Table>
                  </TableContainer>*/}
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
