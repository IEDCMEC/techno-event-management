import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button, Flex } from '@chakra-ui/react';
import { StyledBox, StyledText } from '@/components/ui/StyledComponents';

import DashboardLayout from '@/layouts/DashboardLayout';
import DataDisplay from '@/components/DataDisplay';

// import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';
import useWrapper from '@/hooks/useWrapper';
const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'value', headerName: 'Value', width: 200 },
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 200 },
  { field: 'checkInKey', headerName: 'Check In Key', width: 200 },
  { field: 'addedAt', headerName: 'Added At', width: 200 },
];

export default function AttributeById() {
  const router = useRouter();
  const { orgId, eventId, attributeId } = router.query;
  const showAlert = useAlert();

  // const { loading, get } = useFetch();

  const [attribute, setAttribute] = useState({});
  const [attributeDetails, setAttributeDetails] = useState([]);
  const { useGetQuery } = useWrapper();
  const { isFetching: loading } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/attributes/${attributeId}`,
    `/core/organizations/${orgId}/events/${eventId}/attributes/${attributeId}`,
    {},
    {
      onError: (error) => {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      },
    },
    (response) => {
      // //console.log(response.data);
      setAttribute(response.data.attribute || []);
      setAttributeDetails(response.data.attribute?.participantAttributeDetails || []);
    },
  );
  // //console.log(loading);
  // useEffect(() => {
  //   const fetchAttribute = async () => {
  //     const { data, status } = await get(
  //       `/core/organizations/${orgId}/events/${eventId}/attributes/${attributeId}`,
  //     );
  //     if (status === 200) {
  //       setAttribute(data.attribute || {});
  //       setAttributeDetails(data.attribute?.participantAttributeDetails || []);
  //     } else {
  //       showAlert({
  //         title: 'Error',
  //         description: data.error,
  //         status: 'error',
  //       });
  //     }
  //   };
  //   fetchAttribute();
  // }, []);

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
          router.push(`/${orgId}/events/${eventId}/participants/${row.id}`);
        }}
      />
      {!loading && attributeDetails.length === 0 ? (
        <StyledBox style={{ textAlign: 'center', margin: '20px' }}>
          <StyledText fontSize="25px" color={'blackAlpha.800'} mb={3}>
            No participants assigned
          </StyledText>
          <StyledText color={'gray.500'} mb={3}>
            Assign participants to see details
          </StyledText>
        </StyledBox>
      ) : (
        <></>
      )}
    </DashboardLayout>
  );
}
