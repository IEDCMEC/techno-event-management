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

export default function Events() {
  const router = useRouter();

  const { orgId } = router.query;

  const { loading, get } = useFetch();

  const [events, setEvents] = useState([]);
  const handleClick = () => {
    router.push(`/organizations/${orgId}/events/new/`);
  };
  const handleRowClick = (row) => {
    router.push(`/organizations/${orgId}/events/${row.id}`);
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <div
          onClick={() => {
            router.push(`/organizations/${orgId}/events/${params.row?.id}`);
          }}
          style={{ cursor: 'pointer' }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: 'check-in',
      headerName: 'Check-in',
      width: 200,
      renderCell: (params) => (
        <>
          <div
            onClick={() => {
              router.push(
                `/organizations/${orgId}/events/${params.row?.id}/participants/check-in/new/scanner`,
              );
            }}
            style={{
              cursor: 'pointer',
              backgroundColor: 'rgb(88, 28, 209)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgb(120, 91, 202)',
              },
              width: '50%',
              height: '80%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
            }}
          >
            Check-in
          </div>
        </>
      ),
    },
    {
      field: 'Participants',
      headerName: 'Participants',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => {
              router.push(`/organizations/${orgId}/events/${params.row?.id}`);
            }}
            style={{
              cursor: 'pointer',
              backgroundColor: 'rgb(129, 87, 191)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgb(100, 70, 183)',
              },
              width: '50%',
              height: '80%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
            }}
          >
            Participants
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, status } = await get(`/core/organizations/${orgId}/events`);
      setEvents(data.events || []);
      console.log(data);
    };
    fetchEvents();
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
            Events
          </Text>
          <Box display={'flex'} gap={4}>
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
            <Button
              onClick={() => {
                router.push(`/organizations/${orgId}/members`);
              }}
            >
              Members
            </Button>
          </Box>
        </Box>
        <Box width="100%" height="100%">
          <ThemeProvider theme={MuiTheme}>
            <DataGrid
              rows={events}
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
              <TableCaption>Events</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {events.map((event) => (
                  <Tr
                    key={event?.id}
                    onClick={() => {
                      router.push(`/organizations/${orgId}/events/${event?.id}`);
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
                  <Th>{events.length} events</Th>
                </Tr>
              </Tfoot>
            </Table>
                  </TableContainer>*/}
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
