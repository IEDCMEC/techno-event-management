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
import { StyledBox, StyledText } from '@/components/ui/StyledComponents';
import { IoFilterSharp } from "react-icons/io5";
import { IconButton } from '@chakra-ui/icons';
import { IoSwapVertical } from "react-icons/io5";


const columns = [
  {field:"status" , headerName:"Status" ,width:200},
  { field: 'name', headerName: 'Event Title', width: 200 },
  { field: 'numberOfParticipants', headerName: 'No. Participants', width: 200 },
  {
    field: 'numberOfParticipantsCheckedIn',
    headerName: 'Checked-In Count',
    width: 200,
  },
  { field: 'numberOfAttributes', headerName: 'No. of Attributes', width: 200 },
  //{ field: 'numberOfExtras', headerName: 'No of Extras', width: 200 },
  { field: 'createdAt', headerName: 'Event Date', width: 200 },
];

export default function Events() {
  const router = useRouter();
  const { orgId } = router.query;
  const showAlert = useAlert();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { loading, get } = useFetch();
  const { useGetQuery } = useWrapper();

  const links = [
    {label: "Dashboards" , href: "#"},
    {label: "My Events" , href: "#" , isCurrent: true}
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
      <StyledBox w="100%" h="8%" bg="#efeef3" borderRadius="8px" justifyContent="space-between" flexDirection = "row" padding="10px">
        <StyledBox bg="#efeef3" flexDirection= "row" gap="5px">
          <Button variant="outline" onClick={onOpen} isLoading={loading} sx={{borderRadius: "10px", gap:"5px" , color:"black" , borderColor:"gray.400"}}>Add <StyledText fontSize="20px">+</StyledText></Button>
          <IconButton aria-label='filter' variant={"ghost"}><IoFilterSharp fontSize={"20px"} color='black'/></IconButton>
          <IconButton aria-label='opposite-arrows' variant={"ghost"}><IoSwapVertical fontSize={"20px"} color='black'/></IconButton>
        </StyledBox>

        <StyledBox bg="#efeef3" flexDirection = "row" gap="5px">
        <Button variant="outline" sx={{borderRadius: "10px", gap:"5px" , color:"black" , borderColor:"gray.400"}}>Events</Button>
        <Button variant="outline" isDisabled sx={{borderRadius: "10px", gap:"5px" , color:"black" , borderColor:"gray.400",
        }}>Members</Button>
        </StyledBox>
      </StyledBox>
      <DataDisplay
        loading={loading}
        columns={columns}
        rows={events}
        onRowClick={(row) => {
          router.push(`/${orgId}/events/${row.id}/participants`);
        }}
      />
      {!loading && events.length === 0 ? (
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
        <ModalContent width={{ base: '95vw', md: '75vw' }} maxWidth={'95vw'}>
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
