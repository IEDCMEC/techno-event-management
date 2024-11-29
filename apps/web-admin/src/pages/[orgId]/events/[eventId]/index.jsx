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
  const [attributes, setAttributes] = useState(['firstName', 'lastName', 'email', 'phone']);

  const { data, status, error } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}`,
    `/core/organizations/${orgId}/events/${eventId}`,
    {},
    {},
    (data) => {
      setEvent(data.data.event || []);
    },
  );
  const { isLoading: loading } = useGetQuery(
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
  // useEffect(() => {
  //   const fetchEventAttributes = async () => {
  //     const { data, status } = await get(
  //       `/core/organizations/${orgId}/events/${eventId}/attributes`,
  //     );
  //     if (status === 200) {
  //       setAttributes((preValue) => {
  //         return [...preValue, ...(data.attributes || [])];
  //       });
  //     } else {
  //       showAlert({
  //         title: 'Error',
  //         description: data.error,
  //         status: 'error',
  //       });
  //     }
  //   };
  //   fetchEventAttributes();
  // }, []);

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
          <VStack spacing={2} align="stretch" display={{ base: 'flex', md: 'none' }}>
            {['participants', 'check-in', 'attributes', 'extras'].map((tab) => (
              <Button
                key={tab}
                style={tabStyle(activeTab === tab)}
                onClick={() => {
                  setActiveTab(tab);
                  const element = tab === 'check-in' ? 'participants/check-in' : tab;
                  router.push(`/${orgId}/events/${eventId}/${element}`);
                }}
              >
                {tab === 'check-in'
                  ? 'Participant Check In'
                  : tab.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
              </Button>
            ))}
          </VStack>

          <Flex
            justifyContent="space-evenly"
            alignItems="center"
            width="100%"
            display={{ base: 'none', md: 'flex' }} // Horizontal layout on desktop
          >
            {['participants', 'check-in', 'attributes', 'extras'].map((tab) => (
              <Button
                key={tab}
                style={tabStyle(activeTab === tab)}
                onClick={() => {
                  setActiveTab(tab);
                  const element = tab === 'check-in' ? 'participants/check-in' : tab;
                  router.push(
                    `/${orgId}/events/${eventId}/${element}
                `,
                  );
                }}
              >
                {tab === 'check-in'
                  ? 'Participant Check In'
                  : tab.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
              </Button>
            ))}
          </Flex>
        </Box>

        <Flex
          height="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={4}
          py={6}
        >
          <Text fontSize={{ base: 'xl', md: '3xl' }}>
            Total Participants:{' '}
            <span style={{ fontWeight: 'bold' }}>{event.numberOfParticipants}</span>
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
