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
import NewAttributeForm from './new';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  {
    field: 'numberOfParticipantsWithAttributeAssigned',
    headerName: 'No of Participants Assigned',
    width: 200,
  },
];

export default function Attributes() {
  const router = useRouter();
  const { orgId, eventId } = router.query;
  const showAlert = useAlert();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, get } = useFetch();

  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchAttributes = async () => {
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
    fetchAttributes();
  }, []);

  return (
    <DashboardLayout
      pageTitle="Attributes"
      previousPage={`/organizations/${orgId}/events/${eventId}`}
      headerButton={
        <>
          <Button onClick={onOpen} isLoading={loading}>
            Add Attribute
          </Button>
        </>
      }
      debugInfo={JSON.stringify(attributes)}
    >
      <DataDisplay
        loading={loading}
        columns={columns}
        rows={attributes}
        onRowClick={(row) => {
          router.push(`/${orgId}/events/${eventId}/attributes/${row.id}`);
        }}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Attribute</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewAttributeForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}*/
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
import NewAttributeForm from './new';
import { StyledBox, StyledText } from '@/components/ui/StyledComponents';
import useWrapper from '@/hooks/useWrapper';
import NavigationMenu from '../navigationmenu';
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/icons';
import CustomStyledBox from '@/pages/CustomStyledBox';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  {
    field: 'numberOfParticipantsWithAttributeAssigned',
    headerName: 'No of Participants Assigned',
    width: 200,
  },
];

export default function Attributes() {
  const router = useRouter();
  const { orgId, eventId } = router.query;
  const showAlert = useAlert();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { loading, get } = useFetch();

  const [attributes, setAttributes] = useState([]);
  const { useGetQuery } = useWrapper();
  const { isFetching: loading } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/attributes`,
    `/core/organizations/${orgId}/events/${eventId}/attributes`,
    {},
    {
      onError: (error) => {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      },
    },
    (response) => {
      setAttributes(response.data.attributes || []);
    },
  );

  return (
    <DashboardLayout
      pageTitle="Attributes"
      previousPage={`/organizations/${orgId}/events/${eventId}`}
      debugInfo={JSON.stringify(attributes)}
    >
    <NavigationMenu 
  orgId={orgId} 
  eventId={eventId}
  navButton={
    <div className="flex gap-2.5">
      <Button 
        onClick={onOpen} 
        isLoading={loading} 
        colorScheme="gray"
        sx={{
          display: 'flex',
          padding: '8px 12px',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          borderRadius: 'var(--8, 8px)',
          border: '1px solid var(--black-10, rgba(4, 5, 11, 0.10))',
          background: 'var(--black-4, rgba(4, 5, 11, 0.04))',
        }}
      >
        Add Attribute
      </Button>
    </div>
  }
/>

      <CustomStyledBox></CustomStyledBox>

      <DataDisplay
        loading={loading}
        columns={columns}
        rows={attributes}
        onRowClick={(row) => {
          router.push(`/${orgId}/events/${eventId}/attributes/${row.id}`);
        }}
      />
      {!loading && attributes.length === 0 ? (
        <StyledBox style={{ textAlign: 'center', margin: '20px' }}>
          <StyledText fontSize="25px" color={'blackAlpha.800'} mb={3}>
            No attributes created
          </StyledText>
          <StyledText color={'gray.500'} mb={3}>
            Add attributes and assign participants to see details
          </StyledText>
        </StyledBox>
      ) : (
        <></>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Attribute</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewAttributeForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}
