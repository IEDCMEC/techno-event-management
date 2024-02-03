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

  const { orgId, eventId, attributeId } = router.query;

  const { loading, get } = useFetch();

  const [attribute, setAttribute] = useState({});

  useEffect(() => {
    const fetchAttribute = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/attributes/${attributeId}`,
      );
      setAttribute(data.attribute || []);
      console.log(data);
    };
    fetchAttribute();
  }, [orgId, eventId, attributeId]);

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
            Attribute Details
          </Text>
        </Box>
        <Box width="100%" height="100%">
          {JSON.stringify(attribute)}
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
