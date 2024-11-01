/*import { useRouter } from 'next/router';
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
}*/

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
  const [activeTab, setActiveTab] = useState('participants');

  const isDrawer = useBreakpointValue({ base: true, md: false });

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

  const tabStyle = (isActive) => ({
    color: isActive ? '#369b97' : '#369b97',
    backgroundColor: isActive ? '#e6f7f5' : '#e6f7f5',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: { base: '14px', md: '17px' },
    fontWeight: '600',
    width: { base: '100%', md: 'auto' }, 
  });

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
        <Box
          width="100%"
          backgroundColor="#e6f7f5"
          py={2}
          px={2}
          borderRadius="8px"
          display={{ base: 'block', md: 'flex' }}
        >
          <VStack
            spacing={2}
            align="stretch"
            display={{ base: 'flex', md: 'none' }}  
          >
            {['participants', 'check-in', 'attributes', 'extras'].map((tab) => (
              <Button
                key={tab}
                style={tabStyle(activeTab === tab)}
                onClick={() => {
                  setActiveTab(tab);
                  router.push(`/${orgId}/events/${eventId}/${tab === 'check-in' ? 'participants/check-in' : tab}`);
                }}
              >
                {tab === 'check-in' ? 'Participant Check In' : tab.replace(/(^\w|\s\w)/g, m => m.toUpperCase())}
              </Button>
            ))}
          </VStack>

          <Flex
            justifyContent="space-evenly"
            alignItems="center"
            width="100%"
            display={{ base: 'none', md: 'flex' }}  // Horizontal layout on desktop
          >
            {['participants', 'check-in', 'attributes', 'extras'].map((tab) => (
              <Button
                key={tab}
                style={tabStyle(activeTab === tab)}
                onClick={() => {
                  setActiveTab(tab);
                  router.push(`/${orgId}/events/${eventId}/${tab === 'check-in' ? 'participants/check-in' : tab}`);
                }}
              >
                {tab === 'check-in' ? 'Participant Check In' : tab.replace(/(^\w|\s\w)/g, m => m.toUpperCase())}
              </Button>
            ))}
          </Flex>
        </Box>

        <Flex height="100%" flexDirection="column" justifyContent="center" alignItems="center" gap={4} py={6}>
          <Text fontSize={{ base: 'xl', md: '3xl' }}>
            Total Participants: <span style={{ fontWeight: 'bold' }}>{event.numberOfParticipants}</span>
          </Text>

          <Text fontSize={{ base: 'xl', md: '3xl' }}>
            Participants checked in: <span style={{ fontWeight: 'bold' }}>{event.numberOfParticipantsCheckedIn}</span>
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
        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
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
