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

export default function Members() {
  const router = useRouter();

  const { orgId } = router.query;

  const { loading, get } = useFetch();

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchmembers = async () => {
      const { data, status } = await get(`/core/organizations/${orgId}/members`);
      setMembers(data.organizationUsers || []);
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
            Members
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
          <TableContainer width="100%" height="100%">
            <Table variant="simple">
              <TableCaption>Members</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {members.map((member) => (
                  <Tr key={member?.id}>
                    <Td>{member?.id}</Td>
                    <Td>{member?.email}</Td>
                    <Td>{member?.role}</Td>
                    <Td>{member?.firstName}</Td>
                    <Td>{member?.lastName}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>{members.length} members</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
