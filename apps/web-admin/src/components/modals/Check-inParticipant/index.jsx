import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useColorMode,
  Box,
  ChakraProvider,
} from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';
import useWrapper from '@/hooks/useWrapper';
import { StyledText } from '@/components/ui/StyledComponents';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { inter } from '@/components/ui/fonts';

export default function CheckInParticipant({ isOpen, onClose }) {
  const { loading, post, get } = useFetch();
  const showAlert = useAlert();

  const router = useRouter();
  const { orgId, eventId } = router.query;

  const { useGetQuery } = useWrapper();

  const [checkInKey, setCheckInKey] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState([]);
  const [firstNameInput, setFirstNameInput] = useState('');
  useEffect(() => {
    console.log(firstNameInput);
  }, [firstNameInput]);
  const { colorMode } = useColorMode();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, status } = await post(
      `/core/organizations/${orgId}/events/${eventId}/participants/check-in`,
      {},
      {
        checkInKey,
        checkedInAt: new Date().toISOString(),
      },
    );
    if (status === 200) {
      showAlert({
        title: 'Success',
        description: 'Participant has been checked in  successfully.',
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

  const { data, status, error } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/participants`,
    `/core/organizations/${orgId}/events/${eventId}/participants`,
    {},
    {},
    (data) => {
      setParticipants(data.data.participants);
    },
  );

  useEffect(() => {
    //console.log('checkInKey', checkInKey);
  }, [checkInKey]);

  const handleFirstNameSelect = (selectedItems) => {
    console.log(selectedItems.selectedItems);
    if (selectedItems) {
      const participant = selectedItems.selectedItems;
      if (selectedItems) {
        const latestValue = participant[participant.length - 1];
        setSelectedParticipant([latestValue]);
        setCheckInKey(latestValue ? latestValue.value : '');
        setFirstNameInput(latestValue ? latestValue.label : '');
        // console.log('Check In Key: ', latestValue.value, latestValue.label)
      }
      // setSelectedParticipant([...selectedItems.selectedItems])
      // const myParticipant = participants.filter((value)=> value.firstName === selectedItems)
      // setCheckInKey(myParticipant.length !== 0 ? myParticipant[0].checkInKey : '')
    }
  };

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
          <StyledText>Check In Participant</StyledText>
          <ModalCloseButton color="black" />
        </ModalHeader>
        <ModalBody backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}>
          <Box pl={4} pr={4} pb={0}>
            <form onSubmit={handleSubmit}>
              <FormControl my={4}>
                <FormLabel>
                  <StyledText> Participant ID</StyledText>
                </FormLabel>
                <Select
                  backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                  placeholder="Select Participant ID"
                  value={checkInKey}
                  onChange={(e) => {
                    setCheckInKey(e.target.value);
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
                <FormLabel>
                  <StyledText>First Name</StyledText>
                </FormLabel>
                <ChakraProvider>
                  <CUIAutoComplete
                    bg={colorMode === 'light' ? '#04050B' : '#FBFBFE'}
                    placeholder="Type or Select a First Name"
                    items={participants.map((participant) => ({
                      value: participant.checkInKey,
                      label: participant.firstName,
                    }))}
                    selectedItems={selectedParticipant}
                    inputValue={firstNameInput}
                    onInputChange={(input) => setFirstNameInput(input)}
                    onSelectedItemsChange={handleFirstNameSelect}
                    value={selectedParticipant}
                    tagStyleProps={{
                      display: 'none',
                    }}
                    inputStyleProps={{
                      fontFamily: inter,
                      border: '1px solid gray',
                      rounded: 'md',
                      py: 2,
                      px: 3,
                    }}
                    disableCreateItem
                    hideToggleButton
                  />
                </ChakraProvider>
              </FormControl>
              <FormControl my={4}>
                <FormLabel>
                  <StyledText>Last Name</StyledText>
                </FormLabel>
                <Select
                  backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                  placeholder="Select Last Name"
                  value={checkInKey}
                  onChange={(e) => {
                    setCheckInKey(e.target.value);
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
                <FormLabel>
                  <StyledText> Phone Number</StyledText>
                </FormLabel>
                <Select
                  backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                  placeholder="Select Phone Number"
                  value={checkInKey}
                  onChange={(e) => {
                    setCheckInKey(e.target.value);
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
                <FormLabel>
                  <StyledText> Email</StyledText>
                </FormLabel>
                <Select
                  backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                  placeholder="Select Email"
                  value={checkInKey}
                  onChange={(e) => {
                    setCheckInKey(e.target.value);
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
                <FormLabel>
                  <StyledText> Check In Key</StyledText>
                </FormLabel>
                <Select
                  backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                  placeholder="Add Check In Key"
                  value={checkInKey}
                  onChange={(e) => {
                    setCheckInKey(e.target.value);
                  }}
                >
                  {participants.map((participant) => (
                    <option key={participant.id} value={participant.checkInKey}>
                      {participant.checkInKey}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </form>
          </Box>
        </ModalBody>

        <ModalFooter
          backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}
          borderBottomRadius="10px"
          pt={0}
        >
          <Box flex={1} display="flex" justifyContent="space-around" gap={3} p={3}>
            <Button
              width="100%"
              isLoading={loading}
              loadingText="Please Wait"
              onClick={handleSubmit}
              backgroundColor="#AFB4E9"
              color="black"
              _hover={{ backgroundColor: '#D0D6F6 ' }}
            >
              <StyledText>Check In</StyledText>
            </Button>
            <Button
              backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE1212'}
              mr={3}
              onClick={onClose}
              width={'100%'}
            >
              <StyledText>Close</StyledText>
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
