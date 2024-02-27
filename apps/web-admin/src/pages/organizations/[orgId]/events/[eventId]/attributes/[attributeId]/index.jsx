import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button, Flex } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';
import DataDisplay from '@/components/DataDisplay';

import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';

const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'value', headerName: 'Value', width: 200 },
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 200 },
  { field: 'addedAt', headerName: 'Added At', width: 200 },
];

export default function AttributeById() {
  const router = useRouter();
  const { orgId, eventId, attributeId } = router.query;
  const showAlert = useAlert();

  const { loading, get } = useFetch();

  const [attribute, setAttribute] = useState({});
  const [attributeDetails, setAttributeDetails] = useState([]);

  useEffect(() => {
    const fetchAttribute = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/attributes/${attributeId}`,
      );
      if (status === 200) {
        setAttribute(data.attribute || {});
        setAttributeDetails(data.attribute?.participantAttributeDetails || []);
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };
    fetchAttribute();
  }, []);

  return (
    <DashboardLayout
      pageTitle={attribute?.name}
      previousPage={`/organizations/${orgId}/events/${eventId}/attributes`}
      headerButton={
        <>
          <Button
            onClick={() => {
              router.push(
                `/organizations/${orgId}/events/${eventId}/attributes/${attributeId}/settings`,
              );
            }}
            isLoading={loading}
            disabled="true"
          >
            Attribute Settings
          </Button>
        </>
      }
      debugInfo={JSON.stringify(attribute)}
    >
      <DataDisplay
        loading={loading}
        columns={columns}
        rows={attributeDetails}
        onRowClick={(row) => {
          router.push(`/organizations/${orgId}/events/${eventId}/participants/${row.id}`);
        }}
      />
    </DashboardLayout>
  );
}
