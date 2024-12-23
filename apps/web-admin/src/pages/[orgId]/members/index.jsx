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
import DataDisplay from '@/components/DataDisplay';
// import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';
import NewMemberForm from './new';
import useWrapper from '@/hooks/useWrapper';

const columns = [
  { field: 'role', headerName: 'Role', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
  { field: 'addedAt', headerName: 'Added At', width: 200 },
];

export default function OrganizationMembers() {
  const router = useRouter();
  const { orgId } = router.query;
  const showAlert = useAlert();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { loading, get } = useFetch();
  const { useGetQuery } = useWrapper();

  const [members, setMembers] = useState([]);

  const {
    data,
    status,
    error,
    isFetching: loading,
  } = useGetQuery(
    `/core/organizations/${orgId}/members`,
    `/core/organizations/${orgId}/members`,
    {}, // headers
    {}, // options
    (data) => {
      setMembers(data.data.organizationUsers || []);
    },
  );

  return (
    <DashboardLayout
      pageTitle="Members"
      previousPage={`/${orgId}`}
      headerButton={
        <>
          <Button onClick={onOpen} isLoading={loading}>
            Add Member
          </Button>
        </>
      }
      debugInfo={members}
    >
      <DataDisplay loading={loading} columns={columns} rows={members} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewMemberForm onClose={onClose} />
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
  Text,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import DataDisplay from '@/components/DataDisplay';
import { useFetch } from '@/hooks/useFetch';
import { StyledBox, StyledText } from '@/components/ui/StyledComponents';
import { useAlert } from '@/hooks/useAlert';
import { IoFilterSharp, IoSwapVertical } from 'react-icons/io5';
import NewMemberForm from './new';
import { useColorMode } from '@chakra-ui/react';
// import
const columns = [
  { field: 'role', headerName: 'Role', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
  { field: 'addedAt', headerName: 'Added At', width: 200 },
];

export default function OrganizationMembers() {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { orgId } = router.query;
  const showAlert = useAlert();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, get } = useFetch();

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchOrganizationMembers = async () => {
      const { data, status } = await get(`/core/organizations/${orgId}/members`);
      if (status === 200) {
        setMembers(data.organizationUsers || []);
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };
    fetchOrganizationMembers();
  }, []);

  return (
    <DashboardLayout
      pageTitle="Members"
      previousPage={`/organizations/${orgId}`}
      headerButton={
        <>
          {/* <Button onClick={onOpen} isLoading={loading}>
            Add Member
          </Button> */}
        </>
      }
      debugInfo={members}
    >
      {' '}
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
            // isDisabled
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
      <DataDisplay loading={loading} columns={columns} rows={members} />
      {!loading && members.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Text fontSize="25px" color={'blackAlpha.800'} mb={3}>
            No members for the event
          </Text>
          <Text color={'gray.500'} mb={3}>
            Add members for the event and their details
          </Text>
        </div>
      ) : (
        <></>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewMemberForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}
