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
  useDisclosure,
} from '@chakra-ui/react';
import DashboardLayout from '@/layouts/DashboardLayout';
// import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';
import DataDisplay from '@/components/DataDisplay';
import NewExtraForm from './new'; // Import the form component
import useWrapper from '@/hooks/useWrapper';

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
      <DataDisplay
        loading={loading}
        columns={columns}
        rows={extras}
        onRowClick={(row) => {
          router.push(`/${orgId}/events/${eventId}/extras/${row.id}`);
        }}
      />

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
