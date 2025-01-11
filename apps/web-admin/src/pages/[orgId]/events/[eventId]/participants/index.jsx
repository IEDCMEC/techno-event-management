import { useState, useEffect } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { StyledBox, StyledText } from '@/components/ui/StyledComponents';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import DataDisplay from '@/components/DataDisplay';
import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';
import { CSVLink } from 'react-csv';
import AddParticipant from '@/components/AddParticipant';
import MultiStepModal from '@/components/MultiFormEmail';
import { useContext } from 'react';
import { account } from '@/contexts/MyContext';
import axios from 'axios';
import useWrapper from '@/hooks/useWrapper';
import NavigationMenu from '../navigationmenu';
import { ChevronLeftIcon, ChevronDownIcon, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/icons';
import CustomStyledBox from '@/pages/CustomStyledBox';

const columns = [
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 200 },
  { field: 'checkInKey', headerName: 'Check In Key', width: 200 },
  { field: 'checkedIn', headerName: 'CheckedIn', width: 200 },
  { field: 'numberOfAttributesAssigned', headerName: 'Attributes Assigned', width: 200 },
  { field: 'numnerOfExtrasAssigned', headerName: 'Extras Assigned', width: 200 },
  { field: 'addedAt', headerName: 'Added At', width: 200 },
];

export default function Participants() {
  const { participants, setParticipants } = useContext(account);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkInKey: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const showAlert = useAlert();
  const { orgId, eventId } = router.query;
  const { useGetQuery, usePostMutation } = useWrapper();

  const {
    data,
    status,
    error,
    isLoading: loading,
  } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/participants`,
    `/core/organizations/${orgId}/events/${eventId}/participants`,
    {},
    {},
    (data) => {
      setParticipants(data.data.participants || []);
    },
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const [emailContent, setEmailContent] = useState('');
  const { mutate: addParticipantsMutation } = usePostMutation(
    `/core/organizations/${orgId}/events/${eventId}/participants`,
    {},
    {
      onSuccess: (response) => {
        const value = {
          addedAt: response.data.newParticipant.createdAt,
          id: response.data.newParticipant.id,
          checkInKey: response.data.newParticipant.checkInKey,
          email: response.data.newParticipant.email,
          firstName: response.data.newParticipant.firstName,
          lastName: response.data.newParticipant.lastName,
          numberOfAttributesAssigned: 0,
          numnerOfExtrasAssigned: 0,
          phone: response.data.newParticipant.phone,
        };
        setParticipants((prevValue) => [...prevValue, value]);
        showAlert({
          title: 'Success',
          description: 'Added participant!!',
          status: 'success',
        });
      },
      invalidatelKeys: [`/core/organizations/${orgId}/events/${eventId}/participants`],
    },
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    addParticipantsMutation({
      firstName: formData.firstName,
      lastName: formData.lastName,
      attributes: [],
      phone: formData.phone,
      email: formData.email,
      checkInKey: formData.checkInKey,
    });
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      checkInKey: '',
    });
    onClose();
  };
  const { isOpen: qrIsOpen, onOpen: qROnOpen, onClose: qROnClose } = useDisclosure();

  const exportToCsv = () => {
    const csvData = participants.map((participant) => ({
      firstName: participant.firstName,
      lastName: participant.lastName,
      email: participant.email,
      phone: participant.phone,
      checkInKey: participant.checkInKey,
      checkedIn: participant.checkedIn,
      numberOfAttributesAssigned: participant.numberOfAttributesAssigned,
      numberOfExtrasAssigned: participant.numberOfExtrasAssigned,
      addedAt: participant.addedAt,
    }));

    return (
      <CSVLink
        data={csvData}
        filename={`participants-${eventId}.csv`}
        style={{ textDecoration: 'none' }}
      >
        <Button
          colorScheme="gray"
          variant="solid"
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
          Export to CSV
        </Button>
      </CSVLink>
    );
  };

  return (
    <DashboardLayout
      pageTitle="Participants"
      previousPage={`/organizations/${orgId}/events/${eventId}`}
      debugInfo={participants}
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
              Add Participant
            </Button>
            <Button
              onClick={() => router.push(`/${orgId}/events/${eventId}/participants/new/upload-csv`)}
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
              Upload CSV
            </Button>
            {exportToCsv()}
            <Button
              onClick={qROnOpen}
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
              Send Emails with QR
            </Button>
          </div>
        }
      />

      <CustomStyledBox></CustomStyledBox>

      <DataDisplay loading={loading} rows={participants} columns={columns} />
      {!loading && participants.length === 0 ? (
        <StyledBox style={{ textAlign: 'center', margin: '20px' }}>
          <StyledText fontSize="25px" color={'blackAlpha.800'} mb={3}>
            No participants
          </StyledText>
          <StyledText color={'gray.500'} mb={3}>
            Add participants for the event to see details
          </StyledText>
        </StyledBox>
      ) : (
        <></>
      )}
      <MultiStepModal
        isOpen={qrIsOpen}
        onClose={qROnClose}
        emailContent={emailContent}
        setEmailContent={setEmailContent}
      />
      <AddParticipant
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </DashboardLayout>
  );
}
