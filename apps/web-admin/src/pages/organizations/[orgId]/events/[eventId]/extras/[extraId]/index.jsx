import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button, Flex } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';
import DataDisplay from '@/components/DataDisplay';

import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';

const columns = [
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
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

  const { loading, get } = useFetch();

  const [extra, setExtra] = useState({});
  const [extraDetails, setExtraDetails] = useState([]);

  useEffect(() => {
    const fetchExtra = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/extras/${extraId}`,
      );
      if (status === 200) {
        setExtra(data.extra || {});
        setExtraDetails(data.extra?.participantExtraDetails || []);
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };
    fetchExtra();
  }, []);

  return (
    <DashboardLayout
      pageTitle={extra?.name}
      previousPage={`/organizations/${orgId}/events/${eventId}/extras`}
      headerButton={
        <>
          <Button
            onClick={() => {
              router.push(`/organizations/${orgId}/events/${eventId}/extras/${extraId}/check-in`);
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
              router.push(`/organizations/${orgId}/events/${eventId}/extras/${extraId}/settings`);
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
          router.push(`/organizations/${orgId}/events/${eventId}/participants/${row.id}`);
        }}
      />
    </DashboardLayout>
  );
}
