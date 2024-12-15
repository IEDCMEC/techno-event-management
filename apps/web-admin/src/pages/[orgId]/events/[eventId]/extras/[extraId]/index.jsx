import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Text, Button, Flex } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';
import DataDisplay from '@/components/DataDisplay';

// import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';
import useWrapper from '@/hooks/useWrapper';

const columns = [
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 200 },
  { field: 'checkInKey', headerName: 'Check In Key', width: 200 },
  { field: 'addedAt', headerName: 'Added At', width: 200 },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    valueGetter: (params) => params.row?.checkedIn?.status,
  },
  {
    field: 'at',
    headerName: 'Checked In At',
    width: 200,
    valueGetter: (params) => params.row?.checkedIn?.at,
  },
  {
    field: 'email',
    headerName: 'Checked In By Email',
    width: 200,
    valueGetter: (params) => params.row?.checkedIn?.by?.email,
  },
];

export default function ExtraById() {
  const router = useRouter();
  const { orgId, eventId, extraId } = router.query;
  const showAlert = useAlert();

  // const { loading, get } = useFetch();

  const [extra, setExtra] = useState({});
  const [extraDetails, setExtraDetails] = useState([]);
  const { useGetQuery } = useWrapper();
  const { isLoading: loading } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/extras/${extraId}`,
    `/core/organizations/${orgId}/events/${eventId}/extras/${extraId}`,
    {},
    {
      onError: (error) => {
        showAlert({
          title: 'Error',
          description: error,
          status: 'error',
        });
      },
    },
    (response) => {
      setExtraDetails(response.data.extra?.participantExtraDetails || []);
    },
  );

  return (
    <DashboardLayout
      pageTitle={extra?.name}
      previousPage={`/organizations/${orgId}/events/${eventId}/extras`}
      headerButton={
        <>
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/extras/${extraId}/check-in`);
            }}
            isLoading={loading}
            disabled="true"
          >
            Check In
          </Button>
          <Button
            onClick={() => {
              router.push(
                `/organizations/${orgId}/events/${eventId}/extras/${extraId}/check-in/scanner`,
              );
            }}
            isLoading={loading}
            disabled="true"
          >
            Scanner
          </Button>
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/extras/${extraId}/settings`);
            }}
            isLoading={loading}
            disabled="true"
          >
            Extras Settings
          </Button>
        </>
      }
      debugInfo={extra}
    >
      <DataDisplay
        loading={loading}
        columns={columns}
        rows={extraDetails}
        onRowClick={(row) => {
          router.push(`/${orgId}/events/${eventId}/participants/${row.id}`);
        }}
      />
      {!loading && extraDetails.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Text fontSize="25px" color={'blackAlpha.800'} mb={3}>
            No participants assigned
          </Text>
          <Text color={'gray.500'} mb={3}>
            Assign participants for extras to see details
          </Text>
        </div>
      ) : (
        <></>
      )}
    </DashboardLayout>
  );
}
