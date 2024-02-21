import { useRouter } from 'next/router';

import {
  Box,
  Flex,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Button,
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

  const { orgId, eventId, attributeId } = router.query;

  const { loading, get, put } = useFetch();

  const [attribute, setAttribute] = useState({});
  const [participants, setParticipants] = useState([
    {
      participantAttributes: [{}],
    },
  ]);

  const handleSubmit = async () => {
    const { status } = await put(
      `/core/organizations/${orgId}/events/${eventId}/attributes/${attributeId}`,
      {},
      { name: attribute.name },
    );

    if (status === 200) {
      alert('Attribute updated successfully');
    } else {
      alert('Failed to update attribute');
    }
  };

  useEffect(() => {
    const fetchAttribute = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/attributes/${attributeId}`,
      );
      setAttribute(data.attribute || {});
      console.log(data);
    };
    const fetchAttributeParticipants = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/attributes/${attributeId}/participants`,
      );
      setParticipants(
        data.participants || [
          {
            participantAttributes: [{}],
          },
        ],
      );
    };
    fetchAttribute();
    fetchAttributeParticipants();
  }, [orgId, eventId, attributeId]);

  return (
    <DashboardLayout>
      <Flex
        direction="column"
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="start"
        gap={8}
      >
        <Box width="100%" p={8}>
          <Text fontSize="4xl" fontWeight="bold">
            Attribute Details
          </Text>
        </Box>
        <Flex width="100%" height="auto">
          <Flex flexDirection="row" justifyContent="start" alignItems="center" gap={4}>
            <Input
              type="text"
              name="name"
              minWidth={500}
              fontWeight={600}
              value={attribute.name}
              onChange={(e) => {
                setAttribute({ ...attribute, name: e.target.value });
              }}
            />
            <Button
              type="submit"
              width="100%"
              isLoading={loading}
              onClick={handleSubmit}
              loadingText="Please Wait"
            >
              Edit
            </Button>
          </Flex>
        </Flex>
        <TableContainer width="100%" height="100%">
          <Table variant="simple">
            <TableCaption>Participants</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {participants.map((participant) => (
                <Tr
                  key={participant?.id}
                  onClick={() => {
                    router.push(
                      `/organizations/${orgId}/events/${eventId}/participants/${participant?.id}`,
                    );
                  }}
                  cursor="pointer"
                >
                  <Td>{participant?.id}</Td>
                  <Td>{participant?.firstName}</Td>
                  <Td>{participant?.lastName}</Td>
                  <Td>{participant?.participantAttributes[0]?.value || 'null'}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>{participants.length} participants</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
    </DashboardLayout>
  );
}
