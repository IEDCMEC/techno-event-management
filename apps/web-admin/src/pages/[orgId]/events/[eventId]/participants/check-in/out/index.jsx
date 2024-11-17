import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Button, FormControl, FormLabel, Select } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';
import useWrapper from '@/hooks/useWrapper';


export default function CheckOutParticipant() {
  const { loading, post, get } = useFetch();
  const showAlert = useAlert();

  const router = useRouter();
  const { orgId, eventId } = router.query;

  const {useGetQuery} = useWrapper();

  const [checkInKey, setcheckInKey] = useState(null);
  const [participants, setParticipants] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, status } = await post(
      `/core/organizations/${orgId}/events/${eventId}/participants/check-out`,
      {},
      {
        checkInKey,
        checkedInAt: new Date().toISOString(),
      },
    );
    if (status === 200) {
      showAlert({
        title: 'Success',
        description: 'Participant has been checked out successfully.',
        status: 'success',
      });
      router.push(`/${orgId}/events/${eventId}/participants/check-in`);
    } else {
      showAlert({
        title: 'Error',
        description: data.error,
        status: 'error',
      });
    }
  };

  const {data, status, error} = useGetQuery(
    ['/organizations/:orgId/events/:eventId/participants', orgId, eventId],
    `/core/organizations/${orgId}/events/${eventId}/participants`,
    {},
    {
      enabled: !!orgId && !!orgId,
      onSuccess: () => {
        setParticipants(data.participants);
      },
      onError: () => {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    }
  )

  useEffect(() => {
    console.log('checkInKey', checkInKey);
  }, [checkInKey]);

  return (
    <DashboardLayout
      pageTitle="Check out Participant"
      previousPage={`/organizations/${orgId}/events/${eventId}/participants`}
      debugInfo={JSON.stringify(checkInKey)}
    >
      <form onSubmit={handleSubmit}>
        <FormControl my={4}>
          <FormLabel>Participant ID</FormLabel>
          <Select
            placeholder="Select Participant ID"
            value={checkInKey}
            onChange={(e) => {
              setcheckInKey(e.target.value);
            }}
          >
            {participants.map((participant) => (
              <option key={participant.id} value={participant.checkInKey}>
                {participant.id}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl my={4}>
          <FormLabel>First Name</FormLabel>
          <Select
            placeholder="Select First Name"
            value={checkInKey}
            onChange={(e) => {
              setcheckInKey(e.target.value);
            }}
          >
            {participants.map((participant) => (
              <option key={participant.id} value={participant.checkInKey}>
                {participant.firstName}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl my={4}>
          <FormLabel>Last Name</FormLabel>
          <Select
            placeholder="Select Last Name"
            value={checkInKey}
            onChange={(e) => {
              setcheckInKey(e.target.value);
            }}
          >
            {participants.map((participant) => (
              <option key={participant.id} value={participant.checkInKey}>
                {participant.lastName}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl my={4}>
          <FormLabel>Phone Number</FormLabel>
          <Select
            placeholder="Select Phone Number"
            value={checkInKey}
            onChange={(e) => {
              setcheckInKey(e.target.value);
            }}
          >
            {participants.map((participant) => (
              <option key={participant.id} value={participant.checkInKey}>
                {participant.phone}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl my={4}>
          <FormLabel>Email</FormLabel>
          <Select
            placeholder="Select Email"
            value={checkInKey}
            onChange={(e) => {
              setcheckInKey(e.target.value);
            }}
          >
            {participants.map((participant) => (
              <option key={participant.id} value={participant.checkInKey}>
                {participant.email}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl my={4}>
          <FormLabel>Check In Key</FormLabel>
          <Select
            placeholder="Add Check In Key"
            value={checkInKey}
            onChange={(e) => {
              setcheckInKey(e.target.value);
            }}
          >
            {participants.map((participant) => (
              <option key={participant.id} value={participant.checkInKey}>
                {participant.checkInKey}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" width="100%" my="4" isLoading={loading} loadingText="Please Wait">
          Check In
        </Button>
      </form>
    </DashboardLayout>
  );
}
