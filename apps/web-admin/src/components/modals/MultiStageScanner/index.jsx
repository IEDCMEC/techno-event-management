import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  Button,
  Flex,
  Box,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useColorMode,
} from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';
import Scanner from '@/components/Scanner';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';
import useWrapper from '@/hooks/useWrapper';
import { StyledText } from '@/components/ui/StyledComponents';

export default function CheckInParticipantWithMultiScanner({ isOpen, onClose }) {
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

  const { colorMode } = useColorMode();

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

  // useEffect(() => {
  //   if (checkInKey && previousCheckInKey !== checkInKey && assignedKey && fastMode) {
  //     handleSubmit();
  //   }
  // }, [assignedKey]);

  // in fast mode, when checkInKey is set, state is changed to scan assignedKey & an alert is shown
  // useEffect(() => {
  //   if (fastMode && checkInKey && previousCheckInKey != checkInKey && !assignedKey) {
  //     setAssignedKey(scannedValue);
  //     setStage(2);
  //     showAlert({
  //       title: 'Scan Assigned Key QR Code',
  //       description: 'Fast mode is enabled. Scan QR Code to assign Event Key to participant',
  //       status: 'info',
  //     });
  //   }
  // }, [scannedValue]);

  // useEffect(() => {
  //   if (fastMode) {
  //     showAlert({
  //       title: 'Fast Mode',
  //       description: 'Fast mode is enabled. Participants will be checked in without confirmation.',
  //       status: 'info',
  //     });
  //   }
  // }, [fastMode]);

  //
  // Periodically clear the previous participant id
  //
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setPreviousCheckInKey(null);
  //     setCheckInKey(null);
  //     setAssignedKey(null);
  //     setParticipant(null);
  //   }, 20000);

  //   return () => clearInterval(intervalId);
  // }, [previousCheckInKey]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="10px">
        <ModalHeader
          backgroundColor="#AFB4E9"
          p={6}
          borderTopLeftRadius="10px"
          borderTopRightRadius="10px"
          color="black"
        >
          <StyledText>Check In Participant</StyledText>
          <ModalCloseButton color="black" />
        </ModalHeader>
        <ModalBody backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'} p={3}>
          <Flex height="100%" width="100%" flexDirection="column" alignItems="center">
            <Flex pb="6" justifyContent="center" alignItems="center" fontSize="xl" gap="1">
              <StyledText>Current Stage: </StyledText>
              <StyledText fontWeight="semibold">
                Scanning {stage === 1 ? 'Check-In Key' : 'Assigned Key'}
              </StyledText>
            </Flex>
            {/* <Flex pb="3" justifyContent="center" alignItems="center" gap="4">
          <Text fontSize="xl">Fast Mode</Text>
          <Switch colorScheme="red" size="md" onChange={() => setFastMode(!fastMode)} />
        </Flex> */}
            <Box width={['94%']} pb="3">
              <Scanner result={scannedValue} setResult={setScannedValue} />
            </Box>
            <Flex
              flexDirection="column"
              gap="0.8"
              fontSize="lg"
              justifyContent="center"
              alignItems="center"
            >
              <StyledText>Scanned Value: {scannedValue ? scannedValue : 'None'}</StyledText>
              <StyledText>Check-In Key: {checkInKey ? checkInKey : 'None'}</StyledText>
              <StyledText>Assigned Key: {assignedKey ? assignedKey : 'None'}</StyledText>
            </Flex>
            {participant && (
              <Flex width="100%" flexDirection="column" alignItems="center" gap="6">
                <Flex gap="1" width="100%" justifyContent="space-between">
                  <Flex width="100%" flexDirection="column">
                    <StyledText>First Name: {participant?.firstName}</StyledText>
                    <StyledText>Last Name: {participant?.lastName}</StyledText>
                    <StyledText>Email: {participant?.email}</StyledText>
                    <StyledText>Phone: {participant?.phone}</StyledText>
                  </Flex>
                  <Flex width="100%" flexDirection="column">
                    {participant.checkIn.status ? (
                      <>
                        <StyledText color="red" fontSize="xl">
                          Checked In
                        </StyledText>
                        <StyledText>Checked in at: {participant.checkIn.at}</StyledText>
                        <StyledText>Checked in by: {participant.checkIn.by.email}</StyledText>
                      </>
                    ) : (
                      <StyledText color="green" fontSize="xl">
                        Not Checked In
                      </StyledText>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            )}
          </Flex>
        </ModalBody>

        <ModalFooter
          backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}
          borderBottomRadius="10px"
        >
          <Box flex={1} display="flex" justifyContent="space-around" gap={3} p={3}>
            {scannedValue && (
              <Button backgroundColor="#04050B12" width={'100%'} onClick={confirmScannedValue}>
                <StyledText>Confirm</StyledText> {stage === 1 ? 'Value' : ''}
              </Button>
            )}
            <Button
              width={'100%'}
              onClick={() => {
                resetScanner(null);
              }}
              _hover={{ backgroundColor: '#D0D6F6 ' }}
              backgroundColor="#AFB4E9"
              mr={3}
              color="black"
            >
              <StyledText>Clear</StyledText>
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
