import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Button, FormControl, FormLabel, Select, Flex } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';
import Scanner from '@/components/Scanner';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';

export default function CheckInParticipantWithScanner() {
  const { loading, post, get } = useFetch();
  const showAlert = useAlert();

  const router = useRouter();
  const { orgId, eventId } = router.query;

  const [participantId, setParticipantId] = useState(null);
  const [participantDetails, setParticipantDetails] = useState(null);

  useEffect(() => {
    if (participantId) {
      const fetchParticipantDetails = async () => {
        const { data, status } = await get(
          `/core/organizations/${orgId}/events/${eventId}/participants/${participantId}`,
        );
        if (status === 200) {
          setParticipantDetails(data.participant);
          console.log(data.participant);
        } else {
          showAlert({
            title: 'Error',
            description: data.error,
            status: 'error',
          });
        }
      };
      fetchParticipantDetails();
    }
  }, [orgId, eventId, participantId]);

  const handleCheckIn = async () => {
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
        description: data.message,
        status: 'success',
      });
      setParticipantId(null);
      setParticipantDetails(null);
    } else {
      showAlert({
        title: 'Error',
        description: data.error,
        status: 'error',
      });
    }
  };

  return (
    <DashboardLayout
      pageTitle="Check In Participant"
      previousPage={`/organizations/${orgId}/events/${eventId}/participants`}
      headerButton={
        <>
          <Flex flexDirection="column" gap={4}>
            <Button
              onClick={() => {
                router.push(
                  `/organizations/${orgId}/events/${eventId}/participants/check-in/new-in/scanner`,
                );
              }}
              isLoading={loading}
            >
              Quick Scan
            </Button>
          </Flex>
        </>
      }
    >
      <Flex height="100%" width="100%" flexDirection="column" alignItems="center">
        {participantDetails && (
          <div>
            <p>Name: {participantDetails.firstName + ' ' + participantDetails.lastName}</p>
            <p>Email: {participantDetails.email}</p>
            <Button onClick={handleCheckIn} isLoading={loading}>
              Check In
            </Button>
          </div>
        )}
        <Scanner setResult={setParticipantId} />
      </Flex>
    </DashboardLayout>
  );
}
