import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button, Flex } from '@chakra-ui/react';

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
      previousPage={`/organizations/${orgId}/events`}
      headerButton={
        <>
          <Button
            onClick={() => {
              router.push(`/organizations/${orgId}/events/${eventId}/settings`);
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
      <Flex gap={4}>
        <Button
          onClick={() => {
            router.push(`/organizations/${orgId}/events/${eventId}/participants`);
          }}
          isLoading={loading}
        >
          Participants
        </Button>
        <Button
          onClick={() => {
            router.push(`/organizations/${orgId}/events/${eventId}/participants/check-in`);
          }}
          isLoading={loading}
        >
          Participant Check In
        </Button>
        <Button
          onClick={() => {
            router.push(`/organizations/${orgId}/events/${eventId}/attributes`);
          }}
          isLoading={loading}
        >
          Attributes
        </Button>
        <Button
          onClick={() => {
            router.push(`/organizations/${orgId}/events/${eventId}/extras`);
          }}
          isLoading={loading}
        >
          Extras
        </Button>
      </Flex>
    </DashboardLayout>
  );
}
