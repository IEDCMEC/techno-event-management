import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';

import DataDisplay from '@/components/DataDisplay';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'numberOfParticipants', headerName: 'No of Participants', width: 200 },
  {
    field: 'numberOfParticipantsCheckedIn',
    headerName: 'No of Participants Checked In',
    width: 200,
  },
  { field: 'numberOfAttributes', headerName: 'No of Attributes', width: 200 },
];

export default function Events() {
  const router = useRouter();
  const { orgId } = router.query;
  const showAlert = useAlert();

  const { loading, get } = useFetch();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, status } = await get(`/core/organizations/${orgId}/events`);
      if (status === 200) {
        setEvents(data.events || []);
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };
    fetchEvents();
  }, []);

  return (
    <DashboardLayout
      pageTitle="Event"
      previousPage={`/organizations/${orgId}`}
      headerButton={
        <>
          <Button
            onClick={() => {
              router.push(`/organizations/${orgId}/events/new`);
            }}
            isLoading={loading}
          >
            New Event
          </Button>
        </>
      }
      debugInfo={JSON.stringify(events)}
    >
      <DataDisplay
        loading={loading}
        columns={columns}
        rows={events}
        onRowClick={(row) => {
          router.push(`/organizations/${orgId}/events/${row.id}`);
        }}
      />
    </DashboardLayout>
  );
}
