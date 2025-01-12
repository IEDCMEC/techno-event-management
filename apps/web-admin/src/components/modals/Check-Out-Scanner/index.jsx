import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Switch,
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

export default function CheckOutParticipantWithScanner({ isOpen, onClose }) {
  const { loading, post, get } = useFetch();
  const showAlert = useAlert();

  const router = useRouter();
  const { orgId, eventId } = router.query;

  const { useGetQuery } = useWrapper();

  const [previousCheckInKey, setPreviousCheckInKey] = useState(null);
  const [checkInKey, setCheckInKey] = useState(null);
  const [participant, setParticipant] = useState(null);

  const { colorMode } = useColorMode();

  const [fastMode, setFastMode] = useState(false);

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
      setParticipant(null);
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
    if (checkInKey && previousCheckInKey !== checkInKey && fastMode) {
      handleSubmit();
    }
  }, [checkInKey]);

  useEffect(() => {
    if (fastMode) {
      showAlert({
        title: 'Fast Mode',
        description: 'Fast mode is enabled. Participants will be checked out without confirmation.',
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
      setParticipant(null);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [previousCheckInKey]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="outside" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="10px">
        <ModalHeader
          backgroundColor="#AFB4E9"
          p={6}
          borderTopLeftRadius="10px"
          borderTopRightRadius="10px"
          color="black"
        >
          <StyledText> Check Out Participant </StyledText>
          <ModalCloseButton color="black" />
        </ModalHeader>
        <ModalBody backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}>
          <Box pl={4} pr={4} pb={0}>
            <Flex height="100%" width="100%" flexDirection="column" alignItems="center">
              <Flex pb="6" justifyContent="center" alignItems="center" gap="6">
                <StyledText fontSize="xl">Fast Mode</StyledText>
                <Switch colorScheme="red" size="md" onChange={() => setFastMode(!fastMode)} />
              </Flex>
              <Box width={['95%']}>
                <Scanner result={checkInKey} setResult={setCheckInKey} />
              </Box>
              {!fastMode && participant && (
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
                          <StyledText color="green" fontSize="xl">
                            Checked In
                          </StyledText>
                          <StyledText>Checked in at: {participant.checkIn.at}</StyledText>
                          <StyledText>Checked in by: {participant.checkIn.by.email}</StyledText>
                        </>
                      ) : (
                        <StyledText color="red" fontSize="xl">
                          Not Checked In
                        </StyledText>
                      )}
                    </Flex>
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter
          backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}
          borderBottomRadius="10px"
          pt={0}
        >
          <Box flex={1} display="flex" justifyContent="space-around" gap={3} p={3}>
            <Button
              onClick={handleSubmit}
              width="100%"
              backgroundColor="#AFB4E9"
              color="black"
              _hover={{ backgroundColor: '#D0D6F6 ' }}
            >
              <StyledText>Confirm</StyledText>
            </Button>
            <Button
              backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE1212'}
              mr={3}
              width={'100%'}
              onClick={() => {
                setCheckInKey(null);
                setParticipant(null);
                setPreviousCheckInKey(null);
              }}
            >
              <StyledText>Clear</StyledText>
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
