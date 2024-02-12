import { useRouter } from 'next/router';

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
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
} from '@chakra-ui/react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useFetch } from '@/hooks/useFetch';

import DashboardLayout from '@/layouts/DashboardLayout';
import { useEffect, useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material';
const MuiTheme = createTheme({});

export default function Events() {
  const router = useRouter();

  const { orgId, eventId, participantId } = router.query;

  const { loading, get } = useFetch();

  const [participant, setParticipant] = useState({});
  const [participantAttributes, setParticipantAttributes] = useState([]);

  const attributeColumns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      valueGetter: (params) => params.row.attribute?.name,
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 150,
      valueGetter: (params) => params.value || 'null',
    },
  ];

  useEffect(() => {
    const fetchParticipant = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/participants/${participantId}`,
      );
      setParticipant(data.participant || []);
      setParticipantAttributes(data.participant.participantAttributes || []);
    };
    fetchParticipant();
  }, [orgId, eventId, participantId]);

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
        <Box width="100%" p={8}>
          <Text fontSize="4xl" fontWeight="bold">
            Participant Details
          </Text>
        </Box>
        <Box width="100%" height="100%">
          <Text>ID: {participant.id}</Text>
          <FormControl
            my={4}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <FormLabel>First Name</FormLabel>
            <Input type="text" name="participant.firstName" value={participant.firstName} />
          </FormControl>
          <FormControl
            my={4}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <FormLabel>Last Name</FormLabel>
            <Input type="text" name="participant.lastName" value={participant.lastName} />
          </FormControl>
          <Text fontSize="3xl">Attributes</Text>

          <ThemeProvider theme={MuiTheme}>
            <DataGrid
              rows={participantAttributes}
              columns={attributeColumns}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              slots={{
                toolbar: GridToolbar,
              }}
              getRowId={(row) => {
                return row.attributeId;
              }}
              autoHeight
            />
          </ThemeProvider>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
