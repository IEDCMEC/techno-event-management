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

// import { useFetch } from '@/hooks/useFetch';
import useWrapper from '@/hooks/useWrapper';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useEffect, useState } from 'react';

export default function Events() {
  const router = useRouter();

  const { orgId, eventId, participantId } = router.query;

  // const { loading, get } = useFetch();

  const [participantAttributes, setParticipantAttributes] = useState([]);
  const { useGetQuery } = useWrapper();

  const { isLoading: loading } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/participants/${participantId}/attributes`,
    `/core/organizations/${orgId}/events/${eventId}/participants/${participantId}/attributes`,
    {},
    {
      onSuccess: (response) => {
        setParticipantAttributes(response.data.participantAttributes || []);
        console.log(data);
      },
      onError: (error) => {
        showAlert({
          title: 'Error',
          description: error,
          status: 'error',
        });
      },
    },
  );
  // useEffect(() => {
  //   const fetchParticipantAttributes = async () => {
  //     const { data, status } = await get(
  //       `/core/organizations/${orgId}/events/${eventId}/participants/${participantId}/attributes`,
  //     );
  //     setParticipantAttributes(data.participantAttributes || []);
  //     console.log(data);
  //   };
  //   fetchParticipantAttributes();
  // }, [orgId, eventId, participantId]);

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
            Participant Attributes
          </Text>
        </Box>
        <Box width="100%" height="100%">
          {JSON.stringify(participantAttributes)}
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
