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
} from '@chakra-ui/react';

import { useFetch } from '@/hooks/useFetch';

import DashboardLayout from '@/layouts/DashboardLayout';
import { useEffect, useState } from 'react';

export default function Events() {
  const router = useRouter();

  const { orgId, eventId, participantId } = router.query;

  const { loading, get } = useFetch();

  const [participant, setParticipant] = useState({});

  useEffect(() => {
    const fetchParticipant = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/participants/${participantId}`,
      );
      setParticipant(data.participant || []);
      console.log(data);
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
          <Table variant="striped" colorScheme="">
            <Tbody>
              <Tr>
                <Td>id</Td>
                <Td>{participant.id}</Td>
              </Tr>
              <Tr>
                <Td>createdAt</Td>
                <Td>{participant.createdAt}</Td>
              </Tr>
              <Tr>
                <Td>firstName</Td>
                <Td>{participant.firstName}</Td>
              </Tr>
              <Tr>
                <Td>lastName</Td>
                <Td>{participant.lastName}</Td>
              </Tr>
              <Tr>
                <Td>eventId</Td>
                <Td>{participant.eventId}</Td>
              </Tr>
              <Tr>
                <Td>organizationId</Td>
                <Td>{participant.organizationId}</Td>
              </Tr>
              <Tr>
                <Td>participantCheckIn</Td>
                <Td>{JSON.stringify(participant.participantCheckIn)}</Td>
              </Tr>
              <Tr>
                <Td>updatedAt</Td>
                <Td>{participant.updatedAt}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
