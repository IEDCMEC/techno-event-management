import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Text, Flex } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';

import DataDisplay from '@/components/DataDisplay';

const attributeColumns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'value', headerName: 'Value', width: 200 },
];

const extraColumns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'assigned', headerName: 'Assigned', width: 200 },
  {
    field: 'status',
    headerName: 'Checked In',
    width: 200,
    valueGetter: (params) => (params.row?.checkIn?.status ? 'true' : 'false'),
  },
  {
    field: 'at',
    headerName: 'Checked In At',
    width: 200,
    valueGetter: (params) => params.row?.checkIn?.at,
  },
  {
    field: 'by',
    headerName: 'Checked In By',
    width: 200,
    valueGetter: (params) => params.row?.checkIn?.by?.email,
  },
];

export default function ParticipantById() {
  const router = useRouter();
  const { orgId, eventId, participantId } = router.query;
  const showAlert = useAlert();

  const { loading, get } = useFetch();

  const [participant, setParticipant] = useState([]);
  const [participantAttributes, setParticipantAttributes] = useState([]);
  const [participantExtras, setParticipantExtras] = useState([]);
  const [participantCheckIn, setParticipantCheckIn] = useState({});

  useEffect(() => {
    const fetchParticipant = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/participants/${participantId}`,
      );
      if (status === 200) {
        setParticipant(data.participant || []);
        setParticipantAttributes(data.participant.attributes || []);
        setParticipantExtras(data.participant.extras || []);
        setParticipantCheckIn(data.participant.checkIn || {});
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };
    fetchParticipant();
  }, []);

  return (
    <DashboardLayout
      pageTitle="Participant Details"
      previousPage={`/organizations/${orgId}/events/${eventId}/participants`}
      debugInfo={participant}
    >
      <Flex flexDirection="column">
        <Flex flexDirection="column">
          <Text>ID: {participant.id}</Text>
          <Text>Fist Name: {participant.firstName}</Text>
          <Text>Last Name: {participant.lastName}</Text>
          <Text>Email: {participant.email}</Text>
          <Text>Phone: {participant.phone}</Text>
          <Text>Check In Key: {participant.checkInKey}</Text>
        </Flex>
        <Text>Check In</Text>
        <Flex flexDirection="column">
          <Text>Status: {participantCheckIn.status ? 'true' : 'false'}</Text>
          <Text>Checked In At: {participantCheckIn.checkedInAt}</Text>
          <Flex>
            <Text>Checked In By: {participantCheckIn.checkedInByEmail}</Text>
          </Flex>
        </Flex>
        <Text>Attributes - {participant.numberOfAttributesAssigned} assigned</Text>
        <DataDisplay loading={loading} columns={attributeColumns} rows={participantAttributes} />
        <Text>Extras - {participant.numberOfExtrasAssigned} assigned</Text>
        <Text>Extras - {participant.numberOfExtrasCheckedIn} checked in</Text>
        <DataDisplay loading={loading} columns={extraColumns} rows={participantExtras} />
      </Flex>
    </DashboardLayout>
  );
}
