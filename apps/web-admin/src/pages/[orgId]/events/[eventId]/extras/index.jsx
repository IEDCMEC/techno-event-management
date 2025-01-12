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
  useColorMode,
} from '@chakra-ui/react';
import { StyledBox, StyledButton, StyledText } from '@/components/ui/StyledComponents';
import DashboardLayout from '@/layouts/DashboardLayout';
// import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';
import DataDisplay from '@/components/DataDisplay';
import NewExtraForm from './new'; // Import the form component
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
  const { colorMode } = useColorMode();
  const router = useRouter();
  const { orgId, eventId } = router.query;
  const showAlert = useAlert();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI hook for modal control
  // const { loading, get } = useFetch();

  const [extras, setExtras] = useState([]);
  const { useGetQuery } = useWrapper();
  const { isFetching: loading } = useGetQuery(
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
      debugInfo={extras}
    >
      <NavigationMenu
        orgId={orgId}
        eventId={eventId}
        navButton={
          <div className="flex gap-2.5">
            <StyledButton onClick={onOpen} isLoading={loading}>
              <StyledText>Add Extras</StyledText>
            </StyledButton>
          </div>
        }
      />

      {/* <CustomStyledBox></CustomStyledBox> */}

      <DataDisplay
        loading={loading}
        columns={columns}
        rows={extras}
        onRowClick={(row) => {
          router.push(`/${orgId}/events/${eventId}/extras/${row.id}`);
        }}
      />
      {!loading && extras.length === 0 ? (
        <StyledBox style={{ textAlign: 'center', margin: '20px' }}>
          <StyledText fontSize="25px" color={'blackAlpha.800'} mb={3}>
            No extras created
          </StyledText>
          <StyledText color={'gray.500'} mb={3}>
            Add extras assigned and checked in to see details
          </StyledText>
        </StyledBox>
      ) : (
        <></>
      )}

      {/* Modal for creating a new extra */}
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="10px">
          <ModalHeader
            backgroundColor="#AFB4E9"
            p={6}
            borderTopLeftRadius="10px"
            borderTopRightRadius="10px"
            color="black"
          >
            <StyledText> Add Extra</StyledText>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}
            borderRadius="10px"
          >
            {/* Render the form from new/index.js */}
            <NewExtraForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}
