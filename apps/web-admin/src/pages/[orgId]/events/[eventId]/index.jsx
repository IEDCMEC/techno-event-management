import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';

export default function EventById() {
  const router = useRouter();
  const { orgId, eventId } = router.query;
  const showAlert = useAlert();

  const { loading, get } = useFetch();

  const [event, setEvent] = useState([]);

  useEffect(() => {
    const fetchEventStats = async () => {
      const { data, status } = await get(`/core/organizations/${orgId}/events/${eventId}`);
      if (status === 200) {
        setEvent(data.event || []);
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };
    fetchEventStats();
  }, []);

  return (
    <DashboardLayout
      pageTitle={event?.name}
      previousPage={`/${orgId}/events`}
      headerButton={
        <>
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/settings`);
            }}
            isLoading={loading}
            disabled="true"
          >
            Event Settings
          </Button>
        </>
      }
      debugInfo={JSON.stringify(event)}
    >
      <Flex flexDirection="column" height="100%">
        <Flex gap={4}>
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/participants`);
            }}
            isLoading={loading}
          >
            Participants
          </Button>
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/participants/check-in`);
            }}
            isLoading={loading}
          >
            Participant Check In
          </Button>
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/attributes`);
            }}
            isLoading={loading}
          >
            Attributes
          </Button>
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/extras`);
            }}
            isLoading={loading}
          >
            Extras
          </Button>
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/extras`);
            }}
            isLoading={loading}
          >
            Viewe Form
          </Button>
        </Flex>
        <Flex
          height="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={4}
        >
          <Text fontSize="3xl">
            Total Participants:{' '}
            <Text as="span" fontWeight="bold">
              {event.numberOfParticipants}
            </Text>
          </Text>
          <Text fontSize="3xl">
            Participants checked in:{' '}
            <Text as="span" fontWeight="bold">
              {event.numberOfParticipantsCheckedIn}
            </Text>
          </Text>
        </Flex>
      </Flex>
    </DashboardLayout>
  );
}
