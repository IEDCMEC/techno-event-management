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
import { StyledBox, StyledButton, StyledText } from '@/components/ui/StyledComponents';
import useWrapper from '@/hooks/useWrapper';
import NavigationMenu from '../navigationmenu';
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
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
  const { colorMode } = useColorMode();
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
            <StyledButton onClick={onOpen} isLoading={loading}>
              <StyledText>Add Attribute</StyledText>
            </StyledButton>
          </div>
        }
      />

      {/* <CustomStyledBox></CustomStyledBox> */}

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
            <StyledText>Add Attribute</StyledText>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}
            borderRadius="10px"
          >
            <NewAttributeForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}
