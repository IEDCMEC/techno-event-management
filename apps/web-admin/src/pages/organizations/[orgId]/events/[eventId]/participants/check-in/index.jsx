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

  const { orgId, eventId } = router.query;

  const { loading, get } = useFetch();

  const [participantsCheckIn, setParticipantsCheckIn] = useState([]);

  useEffect(() => {
    const fetchParticipantsCheckIn = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/participants/check-in`,
      );
      setParticipantsCheckIn(data.participantsCheckIn || []);
      console.log(data);
    };
    fetchParticipantsCheckIn();
  }, [orgId, eventId]);

  return (
    <DashboardLayout>
      <Flex
        direction="column"
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="start "
        gap={8}
      >
        <Box width="100%" p={8}>
          <Text fontSize="4xl" fontWeight="bold">
            Participants Check In
          </Text>
        </Box>
        <Box width="100%" height="100%">
          <TableContainer width="100%" height="100%">
            <Table variant="simple">
              <TableCaption>Participants Check In</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Status</Th>
                  <Th>Check In At</Th>
                  <Th>Checked In By</Th>
                </Tr>
              </Thead>
              <Tbody>
                {participantsCheckIn.map((participant) => (
                  <Tr key={participant?.id}>
                    <Td>{participant?.id}</Td>
                    <Td>{participant?.firstName}</Td>
                    <Td>{participant?.lastName}</Td>
                    <Td>{participant?.participantCheckIn.length > 0 ? 'true' : 'false'}</Td>
                    <Td>{participant?.participantCheckIn[0]?.checkedInAt}</Td>
                    <Td>{participant?.participantCheckIn[0]?.checkedInByUser?.email}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>{participantsCheckIn.length} participants</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
