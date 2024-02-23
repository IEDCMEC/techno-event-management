import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import DataDisplay from '@/components/DataDisplay';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';

const columns = [
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
  { field: 'checkedIn', headerName: 'CheckedIn', width: 200 },
  { field: 'numberOfAttributesAssigned', headerName: 'Attributes Assigned', width: 200 },
  { field: 'numnerOfExtrasAssigned', headerName: 'Extras Assigned', width: 200 },
  { field: 'addedAt', headerName: 'Added At', width: 200 },
];

export default function Participants() {
  const router = useRouter();
  const showAlert = useAlert();

  const { orgId, eventId } = router.query;
  const { loading, get } = useFetch();

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/participants`,
      );
      if (status === 200) {
        setParticipants(data.participants || []);
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };
    fetchParticipants();
  }, [orgId, eventId]);

  return (
    <DashboardLayout
      pageTitle="Participants"
      previousPage={`/organizations/${orgId}/events/${eventId}`}
      headerButton={
        <>
          <Button
            onClick={() => {
              router.push(`/organizations/${orgId}/events/${eventId}/participants/new/`);
            }}
            isLoading={loading}
          >
            Add Participant
          </Button>
          <Button
            onClick={() => {
              router.push(`/organizations/${orgId}/events/${eventId}/participants/new/upload-csv`);
            }}
            isLoading={loading}
          >
            Upload CSV
          </Button>
        </>
      }
      debugInfo={participants}
    >
      <DataDisplay
        loading={loading}
        rows={participants}
        columns={columns}
        onRowClick={(row) => {
          router.push(`/organizations/${orgId}/events/${eventId}/participants/${row.id}`);
        }}
      />
    </DashboardLayout>
  );
}
