import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Button, FormControl, FormLabel, Select } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';

export default function CheckInParticipant() {
  const { loading, post, get } = useFetch();
  const showAlert = useAlert();

  const router = useRouter();
  const { orgId, eventId } = router.query;

  const [participantId, setParticipantId] = useState(null);
  const [participants, setParticipants] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, status } = await post(
      `/core/organizations/${orgId}/events/${eventId}/participants/check-in/${participantId}`,
      {},
      {
        checkedInAt: new Date().toISOString(),
      },
    );
    if (status === 200) {
      showAlert({
        title: 'Success',
        description: 'Participant has been checked in  successfully.',
        status: 'success',
      });
      router.push(`/organizations/${orgId}/events/${eventId}/participants/check-in`);
    } else {
      showAlert({
        title: 'Error',
        description: data.error,
        status: 'error',
      });
    }
  };

  useEffect(() => {
    const fetchParticipants = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/participants`,
      );
      if (status === 200) {
        setParticipants(data.participants);
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
      pageTitle="Check In Participant"
      previousPage={`/organizations/${orgId}/events/${eventId}/participants`}
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
