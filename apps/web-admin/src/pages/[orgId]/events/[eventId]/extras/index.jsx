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
  useDisclosure,
} from '@chakra-ui/react';
import { StyledBox, StyledText } from '@/components/ui/StyledComponents';
import DashboardLayout from '@/layouts/DashboardLayout';
// import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';
import DataDisplay from '@/components/DataDisplay';
import NewExtraForm from './new'; // Import the form component
import useWrapper from '@/hooks/useWrapper';
import NavigationMenu from '../navigationmenu';
import { ChevronLeftIcon, ChevronDownIcon,Menu, MenuButton, MenuList, MenuItem  } from '@chakra-ui/icons';
import CustomStyledBox from '@/pages/CustomStyledBox'

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
      <NavigationMenu orgId={orgId} eventId={eventId}
      navButton={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', marginTop: '10px' }}>
          {/* Left side content */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              leftIcon={<ChevronLeftIcon />}
              colorScheme="gray"
              variant="solid"
              onClick={() => router.back()}
            >
              Back
            </Button>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="gray">
                Extras Details
              </MenuButton>
              <MenuList bg="gray.100" borderColor="gray.200">
                <MenuItem
                  color="gray.700"
                  fontWeight="medium"
                  _hover={{ bg: "gray.200" }}
                  onClick={() => router.push(`/${orgId}/events/${eventId}/participants`)}
                >
                  Participants Details
                </MenuItem>
                <MenuItem
                  color="gray.700"
                  fontWeight="medium"
                  _hover={{ bg: "gray.200" }}
                  onClick={() => router.push(`/${orgId}/events/${eventId}/participants/check-in`)}
                >
                  Participants Check-in Details
                </MenuItem>
                <MenuItem
                  color="gray.700"
                  fontWeight="medium"
                  _hover={{ bg: "gray.200" }}
                  onClick={() => router.push(`/${orgId}/events/${eventId}/attributes`)}
                >
                  Attributes Details
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
      
          {/* Right side content */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button onClick={onOpen} isLoading={loading} colorScheme="gray">
              Add Extras
            </Button>
          </div>
        </div>
      }
      />

      <CustomStyledBox></CustomStyledBox>

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
