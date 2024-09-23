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
import DataDisplay from '@/components/DataDisplay';
import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';
import NewMemberForm from './new';

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
}
