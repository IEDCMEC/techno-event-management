import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Button, FormControl, FormLabel, Select, Flex } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';
import Scanner from '@/components/Scanner';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';

export default function CheckOutParticipantWithScanner() {
  const { loading, post, get } = useFetch();
  const showAlert = useAlert();

  const router = useRouter();
  const { orgId, eventId } = router.query;

  const [previousCheckInKey, setPreviousCheckInKey] = useState(null);
  const [checkInKey, setCheckInKey] = useState(null);
  const [participants, setParticipants] = useState([]);

  const handleSubmit = async () => {
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
        description: data.message,
        status: 'success',
      });
      setPreviousCheckInKey(checkInKey);
      setCheckInKey(null);
    } else {
      showAlert({
        title: 'Error',
        description: data.error,
        status: 'error',
      });
      setCheckInKey(null);
      setPreviousCheckInKey(null);
    }
  };

  useEffect(() => {
    if (checkInKey && previousCheckInKey !== checkInKey) handleSubmit();
  }, [checkInKey]);

  //
  // Periodically clear the previous participant id
  //
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPreviousCheckInKey(null);
      setCheckInKey(null);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [previousCheckInKey]);

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
      pageTitle="Check Out Participant"
      previousPage={`/organizations/${orgId}/events/${eventId}/participants`}
      debugInfo={JSON.stringify(checkInKey) + JSON.stringify(previousCheckInKey)}
    >
      <Flex height="100%" width="100%">
        <Scanner result={checkInKey} setResult={setCheckInKey} />
      </Flex>
    </DashboardLayout>
  );
}
