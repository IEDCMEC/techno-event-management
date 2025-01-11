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

const columns = [
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 200 },
  { field: 'numberOfAttributesAssigned', headerName: 'Attributes Assigned', width: 200 },
  { field: 'numnerOfExtrasAssigned', headerName: 'Extras Assigned', width: 200 },
  { field: 'addedAt', headerName: 'Added At', width: 200 },
];

export default function Registrants() {
  const { participants, setParticipants, accountDetails } = useContext(account);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkInKey: '',
  });

  //console.log("test",accountDetails);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const showAlert = useAlert();
  const { orgId, eventId } = router.query;
  // const { loading, get, post } = useFetch();
  const { useGetQuery, usePostMutation } = useWrapper();

  // const { accountDetails } = useContext(account);

  const {
    data,
    status,
    error,
    isLoading: loading,
  } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/registrations`,
    `/core/organizations/${orgId}/events/${eventId}/registrations`,
    {},
    {},
    (data) => {
      setParticipants(data.data.registrants || []);
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
      invalidatelKeys: [`/core/organizations/${orgId}/events/${eventId}/registrations`],
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
  const ExportToCsv = () => {
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
        <Button colorScheme="teal" variant="solid">
          Export to CSV
        </Button>
      </CSVLink>
    );
  };

  return (
    <DashboardLayout
      pageTitle="Participants"
      previousPage={`/organizations/${orgId}/events/${eventId}`}
      headerButton={
        <>
          <Button onClick={onOpen} isLoading={loading}>
            Add Participant
          </Button>
          <Button
            onClick={() => router.push(`/${orgId}/events/${eventId}/participants/new/upload-csv`)}
            isLoading={loading}
          >
            Upload CSV
          </Button>
          <ExportToCsv />
          <Button onClick={qROnOpen}>Send Emails with QR</Button>
        </>
      }
      debugInfo={participants}
    >
      <NavigationMenu orgId={orgId} eventId={eventId} />
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
