import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { useDisclosure, Box, VStack } from '@chakra-ui/react';
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
  FormControl,
  FormLabel,
  Input,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  useBreakpointValue,
} from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

// import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';
import useWrapper from '@/hooks/useWrapper';
import NavigationMenu from './navigationmenu';

export default function EventById() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const router = useRouter();
  const { orgId, eventId } = router.query;
  const showAlert = useAlert();

  // const { loading, get } = useFetch();

  const { useGetQuery } = useWrapper();

  const [event, setEvent] = useState([]);
  const [activeTab, setActiveTab] = useState('participants');
  const isDrawer = useBreakpointValue({ base: true, md: false });
  const [attributes, setAttributes] = useState([
    { key: 'firstName', name: 'First Name: ' },
    { key: 'lastName', name: 'Last Name: ' },
    { key: 'email', name: 'Email: ' },
    { key: 'phone', name: 'Phone No:' },
  ]);

  const { data, status, error } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}`,
    `/core/organizations/${orgId}/events/${eventId}`,
    {},
    {},
    (data) => {
      setEvent(data.data.event || []);
    },
  );
  const { isFetching: loading } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/attributes`,
    `/core/organizations/${orgId}/events/${eventId}/attributes`,
    {},
    {
      onSuccess: (response) => {
        setAttributes((preValue) => {
          return [...(response.data.attributes || [])];
        });
      },
      onError: (error) => {
        showAlert({
          title: 'Error',
          description: error,
          status: 'error',
        });
      },
    },
  );

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
            disabled={true}
            style={{ marginRight: '10px' }}
          >
            Event Settings
          </Button>
          <Button onClick={onOpen} isLoading={loading} style={{ marginRight: '10px' }}>
            Preview Form
          </Button>
        </>
      }
    >
      <Flex flexDirection="column" height="100%" px={{ base: 4, md: 0 }}>
        <NavigationMenu orgId={orgId} eventId={eventId} />

        <Flex
          height="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={4}
          py={6}
        >
          <Text fontSize={{ base: 'xl', md: '3xl' }}>
            Participants: <span style={{ fontWeight: 'bold' }}>{event.numberOfParticipants}</span>
          </Text>

          <Text fontSize={{ base: 'xl', md: '3xl' }}>
            Participants checked in:{' '}
            <span style={{ fontWeight: 'bold' }}>{event.numberOfParticipantsCheckedIn}</span>
          </Text>
        </Flex>
      </Flex>

      {isDrawer ? (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={finalRef}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>Registration Form</DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody>
              {attributes.map((attr, index) => (
                <FormControl mb={5} key={index}>
                  <FormLabel>{attr.name}</FormLabel>
                  <Input ref={initialRef} placeholder={attr.name} />
                </FormControl>
              ))}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
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
              {attributes.map((attr, index) => (
                <FormControl mb={5} key={index}>
                  <FormLabel>{attr.name}</FormLabel>
                  <Input ref={initialRef} placeholder={attr.name} />
                </FormControl>
              ))}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </DashboardLayout>
  );
}
