/*import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';
import DataDisplay from '@/components/DataDisplay';
import { CSVLink } from 'react-csv';
import NewEventForm from './new';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'numberOfParticipants', headerName: 'No of Participants', width: 200 },
  {
    field: 'numberOfParticipantsCheckedIn',
    headerName: 'No of Participants Checked In',
    width: 200,
  },
  { field: 'numberOfAttributes', headerName: 'No of Attributes', width: 200 },
  { field: 'numberOfExtras', headerName: 'No of Extras', width: 200 },
  { field: 'createdAt', headerName: 'Created At', width: 200 },
];

export default function Events() {
  const router = useRouter();
  const { orgId } = router.query;
  const showAlert = useAlert();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, get } = useFetch();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, status } = await get(`/core/organizations/${orgId}/events`);
      if (status === 200) {
        setEvents(data.events || []);
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };
    fetchEvents();
  }, []);

  const exportToCsv = () => {
    const csvData = events.map((event) => ({
      Name: event.name,
      NumParticipants: event.numberOfParticipants,
      NumParticipantsCheckedIn: event.numberOfParticipantsCheckedIn,
      NoOfAttributes: event.numberOfAttributes,
      NoOfExtras: event.numberOfExtras,
      CreatedAt: event.createdAt,
    }));

    return (
      <CSVLink data={csvData} filename={`event-${orgId}.csv`} style={{ textDecoration: 'none' }}>
        <Button color="white">Export to CSV</Button>
      </CSVLink>
    );
  };

  return (
    <DashboardLayout
      pageTitle="Event"
      previousPage={`${orgId}`}
      headerButton={
        <>
          <Button onClick={onOpen} isLoading={loading}>
            New Event
          </Button>
          {exportToCsv()}
        </>
      }
      debugInfo={events}
    >
      <DataDisplay
        loading={loading}
        columns={columns}
        rows={events}
        onRowClick={(row) => {
          router.push(`/${orgId}/events/${row.id}`);
        }}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewEventForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}
*/
import { useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import DashboardLayout from '@/layouts/DashboardLayout';
// import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';
import DataDisplay from '@/components/DataDisplay';
import { CSVLink } from 'react-csv';
import NewEventForm from './new';
import useWrapper from '@/hooks/useWrapper';
import { StyledBox, StyledText } from '@/components/ui/StyledComponents';
import { IoFilterSharp } from 'react-icons/io5';
import { IconButton } from '@chakra-ui/icons';
import { IoSwapVertical } from 'react-icons/io5';
import { account } from '@/contexts/MyContext';

const columns = [
  { field: 'isRegistrationClosed', headerName: 'Registration', width: 200 },
  { field: 'name', headerName: 'Event Title', width: 200 },
  { field: 'numberOfParticipants', headerName: 'No. Participants', width: 200 },
  {
    field: 'numberOfParticipantsCheckedIn',
    headerName: 'Checked-In Count',
    width: 200,
  },
  { field: 'numberOfAttributes', headerName: 'No. of Attributes', width: 200 },
  //{ field: 'numberOfExtras', headerName: 'No of Extras', width: 200 },
  { field: 'startTime', headerName: 'Event Date', width: 200 },
];

export default function Events() {
  const router = useRouter();
  const { orgId } = router.query;
  const showAlert = useAlert();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { loading, get } = useFetch();
  const { useGetQuery } = useWrapper();
  const { accountDetails, setAccountDetails, allAccounts, setAllAccounts } = useContext(account);
  // console.log(accountDetails.Event);

  const links = [
    { label: 'Dashboards', href: '#' },
    { label: 'My Events', href: '#', isCurrent: true },
  ];

  const [events, setEvents] = useState([]);
  console.log(orgId);
  const {
    data,
    status,
    error,
    isFetching: loading,
  } = useGetQuery(
    `/core/organizations/${orgId}/events`,
    `/core/organizations/${orgId}/events`,
    {}, // headers
    {}, // options
    (data) => {
      console.log(data.data.events);
      setEvents(data.data.events || []);
      setAccountDetails((preValue) => ({ ...preValue, Event: data.data.events }));
    },
  );

  const mergedEvents = events.map((event) => {
    const additionalData = (accountDetails?.Event || []).find((e) => e.id === event.id) || {};
    // console.log({ ...event, ...additionalData })
    return { ...event, ...additionalData };
  });

  console.log(mergedEvents);

  const exportToCsv = () => {
    const csvData = events.map((event) => ({
      Name: event.name,
      NumParticipants: event.numberOfParticipants,
      NumParticipantsCheckedIn: event.numberOfParticipantsCheckedIn,
      NoOfAttributes: event.numberOfAttributes,
      NoOfExtras: event.numberOfExtras,
      CreatedAt: event.createdAt,
    }));

    return (
      <CSVLink data={csvData} filename={`event-${orgId}.csv`} style={{ textDecoration: 'none' }}>
        <Button color="white">Export to CSV</Button>
      </CSVLink>
    );
  };
  const { colorMode } = useColorMode();
  return (
    <DashboardLayout
      pageTitle="Event"
      previousPage={`${orgId}`}
      // linksForBreadCrumbs = {links}
      // headerButton={
      //   <>
      //     <Button onClick={onOpen} isLoading={loading}>
      //       New Event
      //     </Button>
      //     {exportToCsv()}
      //   </>
      // }

      debugInfo={events}
    >
      <StyledBox
        w="100%"
        h="44px"
        bg={
          colorMode === 'light'
            ? 'var(--black-5, rgba(4, 5, 11, 0.05))'
            : 'rgba(251, 251, 254, 0.05)'
        }
        borderRadius="8px"
        justifyContent="space-between"
        flexDirection="row"
        padding="10px"
      >
        <StyledBox flexDirection="row" gap="8px" bg="none">
          <Button
            variant="outline"
            onClick={onOpen}
            isLoading={loading}
            padding={'8px 9px 8px 12px'}
            sx={{
              borderRadius: '8px',
              gap: '8px',
              width: '70px',
              height: '28px',
              color: colorMode === 'light' ? 'black' : 'white',
              borderColor: 'rgba(4, 5, 11, 0.1)',
            }}
          >
            Add <StyledText fontSize="20px">+</StyledText>
          </Button>
          <IconButton aria-label="filter" height={'28px'} width={'28px'} variant={'ghost'}>
            <IoFilterSharp fontSize={'20px'} color={colorMode === 'light' ? 'black' : 'white'} />
          </IconButton>
          <IconButton aria-label="opposite-arrows" height={'28px'} width={'28px'} variant={'ghost'}>
            <IoSwapVertical fontSize={'20px'} color={colorMode === 'light' ? 'black' : 'white'} />
          </IconButton>
        </StyledBox>

        <StyledBox flexDirection="row" gap="8px" bg="none">
          <Button
            variant="outline"
            onClick={() => router.push(`/${orgId}/events`)}
            sx={{
              borderRadius: '8px',
              gap: '5px',
              color: colorMode === 'light' ? 'black' : 'white',
              width: '87px',
              height: '28px',
              borderColor:
                colorMode === 'light' ? 'rgba(4, 5, 11, 0.1)' : 'rgba(251, 251, 254, 0.10)',
            }}
          >
            Events
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/${orgId}/members`)}
            sx={{
              borderRadius: '8px',
              gap: '5px',
              width: '87px',
              height: '28px',
              color: colorMode === 'light' ? 'black' : 'white',
              borderColor:
                colorMode === 'light' ? 'rgba(4, 5, 11, 0.1)' : 'rgba(251, 251, 254, 0.10)',
            }}
          >
            Members
          </Button>
        </StyledBox>
      </StyledBox>
      <DataDisplay
        loading={loading}
        columns={columns}
        rows={mergedEvents}
        onRowClick={(row) => {
          router.push(`/${orgId}/events/${row.id}/participants`);
        }}
      />
      {!loading && events.length === 0 ? (
        <StyledBox style={{ textAlign: 'center', margin: '20px' }}>
          <StyledText fontSize="25px" color={'blackAlpha.800'} mb={3}>
            No events for this organization
          </StyledText>
          <StyledText color={'gray.500'} mb={3}>
            Add events for this organization to see details
          </StyledText>
        </StyledBox>
      ) : (
        <></>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth={'85vw'} minHeight={'85vh'}>
          <ModalHeader>Create New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewEventForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}
