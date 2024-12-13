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
import NewExtraForm from './new'; // Import the form component

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  {
    field: 'numberOfParticipantsWithExtrasAssigned',
    headerName: 'No of Participants Assigned',
    width: 200,
  },
  {
    field: 'numberOfParticipantsWithExtrasCheckedIn',
    headerName: 'No of Participants Checked In',
    width: 200,
  },
];

export default function Extras() {
  const router = useRouter();
  const { orgId, eventId } = router.query;
  const showAlert = useAlert();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI hook for modal control
  const { loading, get } = useFetch();

  const [extras, setExtras] = useState([]);

  useEffect(() => {
    const fetchExtras = async () => {
      const { data, status } = await get(`/core/organizations/${orgId}/events/${eventId}/extras`);
      if (status === 200) {
        setExtras(data.extras || []);
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };
    fetchExtras();
  }, []);

  return (
    <DashboardLayout
      pageTitle="Extras"
      previousPage={`/organizations/${orgId}/events/${eventId}`}
      headerButton={
        <>
          <Button onClick={onOpen} isLoading={loading}>
            Add Extra
          </Button>
        </>
      }
      debugInfo={extras}
    >
      <DataDisplay
        loading={loading}
        columns={columns}
        rows={extras}
        onRowClick={(row) => {
          router.push(`/${orgId}/events/${eventId}/extras/${row.id}`);
        }}
      />

      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Extra</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <NewExtraForm onClose={onClose} />
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
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import DashboardLayout from '@/layouts/DashboardLayout';
// import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';
import DataDisplay from '@/components/DataDisplay';
import NewExtraForm from './new'; // Import the form component
import useWrapper from '@/hooks/useWrapper';
import NavigationMenu from '../navigationmenu';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  {
    field: 'numberOfParticipantsWithExtrasAssigned',
    headerName: 'No of Participants Assigned',
    width: 200,
  },
  {
    field: 'numberOfParticipantsWithExtrasCheckedIn',
    headerName: 'No of Participants Checked In',
    width: 200,
  },
];

export default function Extras() {
  const router = useRouter();
  const { orgId, eventId } = router.query;
  const showAlert = useAlert();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI hook for modal control
  // const { loading, get } = useFetch();

  const [extras, setExtras] = useState([]);
  const { useGetQuery } = useWrapper();
  const { isLoading: loading } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/extras`,
    `/core/organizations/${orgId}/events/${eventId}/extras`,
    {},
    {
      onError: (error) => {
        showAlert({
          title: 'Error',
          description: error,
          status: 'error',
        });
      },
    },
    (response) => {
      setExtras(response.data.extras || []);
    },
  );

  return (
    <DashboardLayout
      pageTitle="Extras"
      previousPage={`/organizations/${orgId}/events/${eventId}`}
      headerButton={
        <>
          <Button onClick={onOpen} isLoading={loading}>
            Add Extra
          </Button>
        </>
      }
      debugInfo={extras}
    >
      <NavigationMenu orgId={orgId} eventId={eventId} />
      <DataDisplay
        loading={loading}
        columns={columns}
        rows={extras}
        onRowClick={(row) => {
          router.push(`/${orgId}/events/${eventId}/extras/${row.id}`);
        }}
      />
      {extras.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Text fontSize="25px" color={'blackAlpha.800'} mb={3}>
            No extras created
          </Text>
          <Text color={'gray.500'} mb={3}>
            Add extras assigned and checked in to see details
          </Text>
        </div>
      ) : (
        <></>
      )}

      {/* Modal for creating a new extra */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Extra</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Render the form from new/index.js */}
            <NewExtraForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}
