import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import DataDisplay from '@/components/DataDisplay';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';
import useWrapper from '@/hooks/useWrapper';

import NavigationMenu from '../../navigationmenu';

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

  const { useGetQuery } = useWrapper();

  const [participantsCheckIn, setParticipantsCheckIn] = useState([]);

  const { data, status, error } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/participants/check-in`,
    `/core/organizations/${orgId}/events/${eventId}/participants/check-in`,
    {},
    {},
    (data) => {
      setParticipantsCheckIn(data.data.participantsCheckIn || []);
    },
  );

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
          {/* <NavigationMenu orgId={orgId} eventId={eventId} />*/}
        </>
      }
      debugInfo={participantsCheckIn}
    >
      <NavigationMenu orgId={orgId} eventId={eventId} />

      <DataDisplay
        loading={loading}
        rows={participantsCheckIn}
        columns={columns}
        onRowClick={(row) => {
          router.push(`/${orgId}/events/${eventId}/participants/${row.id}`);
        }}
      />
      {!loading && participantsCheckIn.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Text fontSize="25px" color={'blackAlpha.800'} mb={3}>
            No participants checked-in
          </Text>
          <Text color={'gray.500'} mb={3}>
            Add details about the checked-in participants
          </Text>
        </div>
      ) : (
        <></>
      )}
    </DashboardLayout>
  );
}
