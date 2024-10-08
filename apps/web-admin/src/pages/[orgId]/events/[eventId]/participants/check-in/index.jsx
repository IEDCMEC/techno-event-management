import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button, Flex } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import DataDisplay from '@/components/DataDisplay';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';

const columns = [
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 200 },
  { field: 'checkInKey', headerName: 'Check In Key', width: 200 },
  {
    field: 'checkedInAt',
    headerName: 'Check-In At',
    width: 200,
    valueGetter: (params) => params.row?.checkIn?.checkedInAt || 'Not Checked In',
  },

  {
    field: 'checkedInByEmail',
    headerName: 'Checked In By',
    width: 200,
    valueGetter: (params) => params.row?.checkIn?.checkedInByEmail,
  },
];

export default function ParticipantsCheckIn() {
  const router = useRouter();
  const showAlert = useAlert();

  const { orgId, eventId } = router.query;
  const { loading, get } = useFetch();

  const [participantsCheckIn, setParticipantsCheckIn] = useState([]);

  useEffect(() => {
    const fetchParticipantsCheckIn = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/participants/check-in`,
      );
      if (status === 200) {
        setParticipantsCheckIn(data.participantsCheckIn || []);
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };
    fetchParticipantsCheckIn();
  }, [orgId, eventId]);

  return (
    <DashboardLayout
      pageTitle="Participants Check-In"
      previousPage={`/${orgId}/events/${eventId}/participants`}
      headerButton={
        <>
          <Flex flexDirection="column" gap={4}>
            <Button
              onClick={() => {
                router.push(`/${orgId}/events/${eventId}/participants/check-in/in/`);
              }}
              isLoading={loading}
            >
              Check-In Participant
            </Button>
            <Button
              onClick={() => {
                router.push(`/${orgId}/events/${eventId}/participants/check-in/in/scanner`);
              }}
              isLoading={loading}
            >
              Open Scanner
            </Button>
          </Flex>
          <Flex flexDirection="column" gap={4}>
            <Button
              onClick={() => {
                router.push(`/${orgId}/events/${eventId}/participants/check-in/out/`);
              }}
              isLoading={loading}
            >
              Check-Out Participant
            </Button>
            <Button
              onClick={() => {
                router.push(`/${orgId}/events/${eventId}/participants/check-in/out/scanner`);
              }}
              isLoading={loading}
            >
              Open Scanner
            </Button>
          </Flex>
        </>
      }
      debugInfo={participantsCheckIn}
    >
      <DataDisplay
        loading={loading}
        rows={participantsCheckIn}
        columns={columns}
        onRowClick={(row) => {
          router.push(`/${orgId}/events/${eventId}/participants/${row.id}`);
        }}
      />
    </DashboardLayout>
  );
}
