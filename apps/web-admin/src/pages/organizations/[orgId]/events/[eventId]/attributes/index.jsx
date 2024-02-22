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

export default function Events() {
  const router = useRouter();

  const { orgId, eventId } = router.query;

  const { loading, get } = useFetch();

  const [attributes, setAttributes] = useState([]);
  const handleClick = () => {
    router.push(`/organizations/${orgId}/events/${eventId}/attributes/new`);
  };

  useEffect(() => {
    const fetchAttributes = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/attributes`,
      );
      setAttributes(data.attributes || []);
      console.log(data);
    };
    fetchAttributes();
  }, [orgId, eventId]);
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
          <button onClick={() => router.push(`/organizations/${orgId}/events/${eventId}`)}>
            <BsArrowLeft style={iconStyle} />
          </button>
          <Text fontSize="4xl" fontWeight="bold">
            Attributes
          </Text>
          <Button
            padding="4"
            minWidth="-moz-initial"
            bgColor="rgb(128, 90, 213)"
            color="white"
            _hover={{ bgColor: 'rgb(100, 70, 183)' }}
            onClick={handleClick}
          >
            Add Attribute
          </Button>
        </Box>
        <Box width="100%" height="100%">
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
                {attributes.map((attribute) => (
                  <Tr
                    key={attribute?.id}
                    onClick={() => {
                      router.push(
                        `/organizations/${orgId}/events/${eventId}/attributes/${attribute?.id}`,
                      );
                    }}
                    cursor="pointer"
                  >
                    <Td>{attribute?.id}</Td>
                    <Td>{attribute?.name}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>{attributes.length} attributes</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
