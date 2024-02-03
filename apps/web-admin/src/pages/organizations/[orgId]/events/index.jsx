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

export default function Events() {
  const router = useRouter();

  const { orgId } = router.query;

  const { loading, get } = useFetch();

  const [events, setEvents] = useState([]);
  const handleClick = () => {
    router.push(`/organizations/${orgId}/events/new/`);
  };
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, status } = await get(`/core/organizations/${orgId}/events`);
      setEvents(data.events || []);
      console.log(data);
    };
    fetchEvents();
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
            Events
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
          <TableContainer width="100%" height="100%">
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
          </TableContainer>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
