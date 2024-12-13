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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Text,
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
  // const { loading, get } = useFetch();
  const { useGetQuery } = useWrapper();

  const [events, setEvents] = useState([]);
  console.log(orgId);
  const {
    data,
    status,
    error,
    isLoading: loading,
  } = useGetQuery(
    `/core/organizations/${orgId}/events`,
    `/core/organizations/${orgId}/events`,
    {}, // headers
    {}, // options
    (data) => {
      console.log(`events: ${data.data.events}`);
      setEvents(data.data.events || []);
    },
  );

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
          router.push(`/${orgId}/events/${row.id}/participants`);
        }}
      />
      {events.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Text fontSize="25px" color={'blackAlpha.800'} mb={3}>
            No events for this organization
          </Text>
          <Text color={'gray.500'} mb={3}>
            Add events for this organization to see details
          </Text>
        </div>
      ) : (
        <></>
      )}

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
