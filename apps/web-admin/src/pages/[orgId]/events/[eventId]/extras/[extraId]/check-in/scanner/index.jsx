import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Button, FormControl, FormLabel, Select, Flex } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';
import Scanner from '@/components/Scanner';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';
import useWrapper from '@/hooks/useWrapper'

export default function CheckInParticipantWithScanner() {
  const { loading, post, get } = useFetch();
  const showAlert = useAlert();

  const router = useRouter();
  const { orgId, eventId, extraId } = router.query;

  const {useGetQuery} = useWrapper();

  const [previousPartiicpantId, setPreviousParticipantId] = useState(null);
  const [participantId, setParticipantId] = useState(null);
  const [participants, setParticipants] = useState([]);

  const handleSubmit = async () => {
    const { data, status } = await post(
      `/core/organizations/${orgId}/events/${eventId}/extras/${extraId}/check-in`,
      {},
      {
        participantId,
        checkedInAt: new Date().toISOString(),
      },
    );
    if (status === 200) {
      showAlert({
        title: 'Success',
        description: data.message,
        status: 'success',
      });
      setPreviousParticipantId(participantId);
      setParticipantId(null);
    } else {
      showAlert({
        title: 'Error',
        description: data.error,
        status: 'error',
      });
      setParticipantId(null);
      setPreviousParticipantId(null);
    }
  };

  useEffect(() => {
    if (participantId && previousPartiicpantId !== participantId) handleSubmit();
  }, [participantId]);

  //
  // Periodically clear the previous participant id
  //
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPreviousParticipantId(null);
      setParticipantId(null);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [previousPartiicpantId]);

  const {data, status, error} = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/participants`,
    `/core/organizations/${orgId}/events/${eventId}/participants`,
    {},
    {},
    (data) => {
      setParticipants(data.participants);
    }
  )

  return (
    <DashboardLayout
      pageTitle="Check In  Participant"
      previousPage={`/organizations/${orgId}/events/${eventId}/participants`}
      debugInfo={participantId + ' ' + previousPartiicpantId}
    >
      {/* <form onSubmit={handleSubmit}>
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
      </form> */}
      <Flex height="100%" width="100%">
        <Scanner result={participantId} setResult={setParticipantId} />
      </Flex>
    </DashboardLayout>
  );
}
