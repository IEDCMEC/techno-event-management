import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Button, FormControl, FormLabel, Select } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useAlert } from '@/hooks/useAlert';
import useWrapper from '@/hooks/useWrapper';

export default function CheckInExtra() {
  const showAlert = useAlert();

  const router = useRouter();
  const { orgId, eventId, extraId } = router.query;

  const [participantId, setParticipantId] = useState(null);
  const [participants, setParticipants] = useState([]);
  const { usePostMutation, useGetQuery } = useWrapper();
  const { mutate: handleCheckInMutation } = usePostMutation(
    `/core/organizations/${orgId}/events/${eventId}/extras/${extraId}/check-in`,
    {},
    {
      onSuccess: (response) => {
        showAlert({
          title: 'Success',
          description: 'Extra for participant has been checked in  successfully.',
          status: 'success',
        });
        router.push(`/${orgId}/events/${eventId}/extras/${extraId}`);
      },
      onError: (error) => {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      },
    },
  );
  const { isFetching: loading } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/participants`,
    `/core/organizations/${orgId}/events/${eventId}/participants`,
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
      setParticipants(response.data.participants);
    },
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCheckInMutation({
      participantId,
      checkedInAt: new Date().toISOString(),
    });
  };

  return (
    <DashboardLayout
      pageTitle="Check In Extra"
      previousPage={`/organizations/${orgId}/events/${eventId}/extras`}
      debugInfo={JSON.stringify(participantId)}
    >
      <form onSubmit={handleSubmit}>
        <FormControl my={4}>
          <FormLabel>Participant ID</FormLabel>
          <Select
            placeholder="Select Participant ID"
            value={participantId}
            onChange={(e) => {
              setParticipantId(e.target.value);
            }}
          >
            {participants.map((participant) => (
              <option key={participant.id} value={participant.id}>
                {participant.id}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl my={4}>
          <FormLabel>First Name</FormLabel>
          <Select
            placeholder="Select First Name"
            value={participantId}
            onChange={(e) => {
              setParticipantId(e.target.value);
            }}
          >
            {participants.map((participant) => (
              <option key={participant.id} value={participant.id}>
                {participant.firstName}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl my={4}>
          <FormLabel>Last Name</FormLabel>
          <Select
            placeholder="Select Last Name"
            value={participantId}
            onChange={(e) => {
              setParticipantId(e.target.value);
            }}
          >
            {participants.map((participant) => (
              <option key={participant.id} value={participant.id}>
                {participant.lastName}
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
