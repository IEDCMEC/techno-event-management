import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Button, FormControl, FormLabel, Select, Flex, Switch, Box, Text } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';
import Scanner from '@/components/Scanner';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';
import useWrapper from '@/hooks/useWrapper';

export default function CheckInParticipantWithScanner() {
  const { loading, post, get } = useFetch();
  const showAlert = useAlert();

  const router = useRouter();
  const { orgId, eventId } = router.query;

  const { useGetQuery } = useWrapper();

  const [stage, setStage] = useState(1);
  const [previousCheckInKey, setPreviousCheckInKey] = useState(null);
  const [checkInKey, setCheckInKey] = useState(null);
  const [assignedKey, setAssignedKey] = useState(null);
  const [scannedValue, setScannedValue] = useState(null);
  const [participant, setParticipant] = useState(null);

  const [fastMode, setFastMode] = useState(false);

  const handleSubmit = async () => {
    const { data, status } = await post(
      `/core/organizations/${orgId}/events/${eventId}/participants/check-in`,
      {},
      {
        checkInKey,
        assignedKey,
        checkedInAt: new Date().toISOString(),
      },
    );
    if (status === 200) {
      showAlert({
        title: 'Success',
        description: data.message,
        status: 'success',
      });
      resetScanner(checkInKey);
    } else {
      showAlert({
        title: 'Error',
        description: data.error,
        status: 'error',
      });
      resetScanner(null);
    }
  };

  // reset states
  const resetScanner = (value) => {
    setStage(1);
    setCheckInKey(null);
    setPreviousCheckInKey(value);
    setAssignedKey(null);
    setScannedValue(null);
    setParticipant(null);
  };

  // sets scanned value to corresponding state
  const confirmScannedValue = () => {
    if (stage == 1) {
      setCheckInKey(scannedValue);
      setScannedValue(null);
      setStage(2);
    } else if (stage == 2) {
      setAssignedKey(scannedValue);
      handleSubmit();
    }
  };

  const { data, status, error } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/participants/check-in/${checkInKey}`,
    `/core/organizations/${orgId}/events/${eventId}/participants/check-in/${checkInKey}`,
    {},
    {},
    (data) => {
      setParticipant(data.data.participant);
    },
  );

  useEffect(() => {
    if (checkInKey && previousCheckInKey !== checkInKey && assignedKey && fastMode) {
      handleSubmit();
    }
  }, [assignedKey]);

  // in fast mode, when checkInKey is set, state is changed to scan assignedKey & an alert is shown
  useEffect(() => {
    if (fastMode && checkInKey && previousCheckInKey != checkInKey && !assignedKey) {
      setAssignedKey(scannedValue);
      setStage(2);
      showAlert({
        title: 'Scan Assigned Key QR Code',
        description: 'Fast mode is enabled. Scan QR Code to assign Event Key to participant',
        status: 'info',
      });
    }
  }, [scannedValue]);

  useEffect(() => {
    if (fastMode) {
      showAlert({
        title: 'Fast Mode',
        description: 'Fast mode is enabled. Participants will be checked in without confirmation.',
        status: 'info',
      });
    }
  }, [fastMode]);

  //
  // Periodically clear the previous participant id
  //
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPreviousCheckInKey(null);
      setCheckInKey(null);
      setAssignedKey(null);
      setParticipant(null);
    }, 20000);

    return () => clearInterval(intervalId);
  }, [previousCheckInKey]);

  return (
    <DashboardLayout
      pageTitle="Check In  Participant"
      previousPage={`/organizations/${orgId}/events/${eventId}/participants/check-in`}
      debugInfo={checkInKey + ' ' + previousCheckInKey}
    >
      <Flex height="100%" width="100%" flexDirection="column" alignItems="center">
        <Flex pb="6" justifyContent="center" alignItems="center" fontSize="xl" gap="1">
          <Text>Current Stage: </Text>
          <Text fontWeight="semibold">
            Scanning {stage === 1 ? 'Check-In Key' : 'Assigned Key'}
          </Text>
        </Flex>
        <Flex pb="3" justifyContent="center" alignItems="center" gap="4">
          <Text fontSize="xl">Fast Mode</Text>
          <Switch colorScheme="red" size="md" onChange={() => setFastMode(!fastMode)} />
        </Flex>
        <Box width={['100%', '60%', '50%', '30%']} pb="3">
          <Scanner result={scannedValue} setResult={setScannedValue} />
        </Box>
        <Flex
          flexDirection="column"
          gap="0.8"
          fontSize="lg"
          justifyContent="center"
          alignItems="center"
        >
          <Text>Scanned Value: {scannedValue ? scannedValue : 'None'}</Text>
          <Text>Check-In Key: {checkInKey ? checkInKey : 'None'}</Text>
          <Text>Assigned Key: {assignedKey ? assignedKey : 'None'}</Text>
        </Flex>
        {!fastMode && participant && (
          <Flex width="100%" flexDirection="column" alignItems="center" gap="6">
            <Flex gap="1" width="100%" justifyContent="space-between">
              <Flex width="100%" flexDirection="column">
                <Text>First Name: {participant?.firstName}</Text>
                <Text>Last Name: {participant?.lastName}</Text>
                <Text>Email: {participant?.email}</Text>
                <Text>Phone: {participant?.phone}</Text>
              </Flex>
              <Flex width="100%" flexDirection="column">
                {participant.checkIn.status ? (
                  <>
                    <Text color="red" fontSize="xl">
                      Checked In
                    </Text>
                    <Text>Checked in at: {participant.checkIn.at}</Text>
                    <Text>Checked in by: {participant.checkIn.by.email}</Text>
                  </>
                ) : (
                  <Text color="green" fontSize="xl">
                    Not Checked In
                  </Text>
                )}
              </Flex>
            </Flex>
          </Flex>
        )}
        <Flex gap="6" pt="3">
          {scannedValue && (
            <Button onClick={confirmScannedValue}>Confirm {stage === 1 ? 'Value' : ''}</Button>
          )}
          <Button
            onClick={() => {
              resetScanner(null);
            }}
          >
            Clear
          </Button>
        </Flex>
      </Flex>
    </DashboardLayout>
  );
}
