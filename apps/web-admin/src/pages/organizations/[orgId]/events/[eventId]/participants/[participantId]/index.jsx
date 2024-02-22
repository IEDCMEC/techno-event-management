import { useRouter } from 'next/router';

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Button,
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

  const { loading, get, put } = useFetch();

  const [participant, setParticipant] = useState({});
  const [participantAttributes, setParticipantAttributes] = useState([]);

  const handleSubmit = async () => {
    const { status } = await put(
      `/core/organizations/${orgId}/events/${eventId}/participants/${participantId}`,
      {},
      { firstName: participant.firstName, lastName: participant.lastName },
    );

    if (status === 200) {
      alert('Participant updated successfully');
    } else {
      alert('Failed to update participant');
    }
  };

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
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="4xl" fontWeight="bold">
              Participant Details
            </Text>
            <Button onClick={handleSubmit}>Save</Button>
          </Flex>
        </Box>
        <Flex width="100%" height="100%" flexDirection="column" gap={4}>
          <Flex flexDirection="column" justifyContent="center" alignItems="start" gap={4}>
            <Text>ID: {participant.id}</Text>
            <Flex alignItems="center" gap={4}>
              <Text fontWeight={500}>First Name</Text>
              <Input
                type="text"
                name="firstName"
                width="auto"
                value={participant.firstName}
                onChange={(e) => {
                  setParticipant({ ...participant, firstName: e.target.value });
                }}
              />
            </Flex>
            <Flex alignItems="center" gap={4}>
              <Text fontWeight={500}>Last Name</Text>
              <Input
                type="text"
                name="lastName"
                width="auto"
                value={participant.lastName}
                onChange={(e) => {
                  setParticipant({ ...participant, lastName: e.target.value });
                }}
              />
            </Flex>
          </Flex>
          <Text fontSize="3xl" fontWeight={500}>
            Attributes
          </Text>
          <TableContainer width="100%" height="100%">
            <Table variant="simple">
              <TableCaption>Attributes</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {participantAttributes.map((participantAttribute) => (
                  <Tr key={participantAttribute?.id}>
                    <Td>{participantAttribute?.attribute?.name}</Td>
                    <Td>
                      <Input
                        type="text"
                        name="lastName"
                        width="auto"
                        value={participantAttribute?.value}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>{participantAttributes.length} attributes</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </DashboardLayout>
  );
}
