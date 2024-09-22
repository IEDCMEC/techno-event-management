import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';

import { useDisclosure } from '@chakra-ui/react';
import {
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';

export default function EventById() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const router = useRouter();
  const { orgId, eventId } = router.query;
  const showAlert = useAlert();

  const { loading, get } = useFetch();

  const [event, setEvent] = useState([]);
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchEventStats = async () => {
      const { data, status } = await get(`/core/organizations/${orgId}/events/${eventId}`);
      if (status === 200) {
        setEvent(data.event || []);
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };

    const fetchEventAttributes = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/attributes`,
      );
      if (status === 200) {
        setAttributes(data.attributes || []);
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };
    fetchEventStats();
    fetchEventAttributes();
  }, []);

  return (
    <DashboardLayout
      pageTitle={event?.name}
      previousPage={`/${orgId}/events`}
      headerButton={
        <>
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/settings`);
            }}
            isLoading={loading}
            disabled="true"
          >
            Event Settings
          </Button>
        </>
      }
      debugInfo={JSON.stringify({ event, attributes })}
    >
      <Flex flexDirection="column" height="100%">
        <Flex gap={4}>
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/participants`);
            }}
            isLoading={loading}
          >
            Participants
          </Button>
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/participants/check-in`);
            }}
            isLoading={loading}
          >
            Participant Check In
          </Button>
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/attributes`);
            }}
            isLoading={loading}
          >
            Attributes
          </Button>
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/extras`);
            }}
            isLoading={loading}
          >
            Extras
          </Button>
          <Button onClick={onOpen} isLoading={loading}>
            Preview Form
          </Button>
        </Flex>
        <Flex
          height="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={4}
        >
          <Text fontSize="3xl">
            Total Participants:{' '}
            <Text as="span" fontWeight="bold">
              {event.numberOfParticipants}
            </Text>
          </Text>
          <Text fontSize="3xl">
            Participants checked in:{' '}
            <Text as="span" fontWeight="bold">
              {event.numberOfParticipantsCheckedIn}
            </Text>
          </Text>
        </Flex>
      </Flex>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registration Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10}>
            {attributes.map((attr, index) => {
              return (
                <FormControl mb={5} key={index}>
                  <FormLabel>{attr.name}</FormLabel>
                  <Input ref={initialRef} placeholder={`${attr.name}`} />
                </FormControl>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}
