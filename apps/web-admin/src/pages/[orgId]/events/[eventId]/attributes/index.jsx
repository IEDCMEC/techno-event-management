import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';

import DataDisplay from '@/components/DataDisplay';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  {
    field: 'numberOfParticipantsWithAttributeAssigned',
    headerName: 'No of Participants Assigned',
    width: 200,
  },
];

export default function Attributes() {
  const router = useRouter();
  const { orgId, eventId } = router.query;
  const showAlert = useAlert();

  const { loading, get } = useFetch();

  const [event, setEvent] = useState([]);
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchAttributes = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/attributes`,
      );
      if (status === 200) {
        setAttributes(data.attributes || []);
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };
    fetchAttributes();
  }, []);

  return (
    <DashboardLayout
      pageTitle="Attributes"
      previousPage={`/organizations/${orgId}/events/${eventId}`}
      headerButton={
        <>
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/attributes/new`);
            }}
            isLoading={loading}
          >
            Add Attribute
          </Button>
        </>
      }
      debugInfo={JSON.stringify(attributes)}
    >
      <DataDisplay
        loading={loading}
        columns={columns}
        rows={attributes}
        onRowClick={(row) => {
          router.push(`/${orgId}/events/${eventId}/attributes/${row.id}`);
        }}
      />
    </DashboardLayout>
  );
}
