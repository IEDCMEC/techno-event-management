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

export default function Organizations() {
  const router = useRouter();

  const { orgId } = router.query;

  const { loading, get } = useFetch();

  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const { data, status } = await get('/core/organizations');
      setOrganizations(data.organizations || []);
    };
    fetchOrganizations();
  }, []);
  const handleClick = () => {
    router.push('organizations/new');
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
          <Text fontSize="4xl" fontWeight="bold">
            Organizations
          </Text>
          <Button
            padding="4"
            minWidth="-moz-initial"
            bgColor="rgb(128, 90, 213)"
            color="white"
            _hover={{ bgColor: 'rgb(100, 70, 183)' }}
            onClick={handleClick}
          >
            Add Organization
          </Button>
        </Box>
        <Box width="100%" height="100%">
          <TableContainer width="100%" height="100%">
            <Table variant="simple">
              <TableCaption>Organizations</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {organizations.map((organization) => (
                  <Tr
                    key={organization?.id}
                    onClick={() => {
                      router.push(`/organizations/${organization.id}`);
                    }}
                    cursor="pointer"
                  >
                    <Td>{organization?.id}</Td>
                    <Td>{organization?.name}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>{organizations.length} organizations</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
