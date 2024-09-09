import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';
import DataDisplay from '@/components/DataDisplay';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';
import { EditIcon, ViewIcon } from '@chakra-ui/icons';

import { CSVLink } from 'react-csv';

const columns = [
  { field: 'firstName', headerName: 'First Name', width: 200, editable: true },
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
  const columns = [
    { field: 'firstName', headerName: 'First Name', width: 125 },
    { field: 'lastName', headerName: 'Last Name', width: 125 },
    {
      field: 'edit',
      headerName: '',
      sortable: false,
      width: 50,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            router.push(
              `/organizations/${orgId}/events/${eventId}/participants/${params.row.id}/edit`,
            );
          }}
        >
          <EditIcon />
        </Button>
      ),
    },
    {
      field: 'view',
      headerName: '',
      sortable: false,
      width: 50,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            router.push(`/${orgId}/events/${eventId}/participants/${params.row.id}`);
          }}
        >
          <ViewIcon />
        </Button>
      ),
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 125 },
    { field: 'checkInKey', headerName: 'Check In Key', width: 125 },
    { field: 'checkedIn', headerName: 'CheckedIn', width: 125 },
    { field: 'numberOfAttributesAssigned', headerName: 'Attributes Assigned', width: 125 },
    { field: 'numnerOfExtrasAssigned', headerName: 'Extras Assigned', width: 125 },
    { field: 'addedAt', headerName: 'Added At', width: 125 },
  ];
  const router = useRouter();
  const showAlert = useAlert();

  const { orgId, eventId } = router.query;
  const { loading, get } = useFetch();

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/participants`,
      );
      if (status === 200) {
        setParticipants(data.participants || []);
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };
    fetchParticipants();
  }, [orgId, eventId]);

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
        style={{ textDecoration: 'none' }} // Remove underline for link
      >
        <Button
          colorScheme="teal" // color from other buttons
          variant="solid"
        >
          {' '}
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
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/participants/new/`);
            }}
            isLoading={loading}
          >
            Add Participant
          </Button>
          <Button
            onClick={() => {
              router.push(`/${orgId}/events/${eventId}/participants/new/upload-csv`);
            }}
            isLoading={loading}
          >
            Upload CSV
          </Button>
          {exportToCsv()}
        </>
      }
      debugInfo={participants}
    >
      <DataDisplay loading={loading} rows={participants} columns={columns} />
    </DashboardLayout>
  );
}
