import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';
import useWrapper from '@/hooks/useWrapper';

export default function EditParticipant() {
  const { loading, put, get } = useFetch();
  const showAlert = useAlert();

  const router = useRouter();
  const { orgId, eventId, participantId } = router.query;

  const { useGetQuery } = useWrapper();

  const [participant, setParticipant] = useState({});
  const [attributes, setAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, status } = await put(
      `/core/organizations/${orgId}/events/${eventId}/participants/${participantId}`,
      {},
      {
        firstName: participant.firstName,
        lastName: participant.lastName,
        email: participant.email,
        phone: participant.phone,
        checkInKey: participant.checkInKey,
        checkedIn: participant.checkedIn,
        attributes: attributeValues,
      },
    );

    if (status === 200) {
      showAlert({
        title: 'Success',
        description: 'Participant has been updated successfully.',
        status: 'success',
      });
      router.push(`/${orgId}/events/${eventId}/participants`);
    } else {
      showAlert({
        title: 'Error',
        description: data.error,
        status: 'error',
      });
    }
  };

  const { data, status, error } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/participants/${participantId}`,
    `/core/organizations/${orgId}/events/${eventId}/participants/${participantId}`,
    {},
    {},
    (data) => {
      setParticipant(data.data.participant);
      setAttributeValues(data.data.participant.attributes);
    },
  );

  if (!participant) {
    return null;
  }

  return (
    <DashboardLayout
      pageTitle="Edit Participant"
      previousPage={`/organizations/${orgId}/events/${eventId}/participants`}
      style={{ overflow: 'auto' }}
    >
      <form onSubmit={handleSubmit}>
        <FormControl isRequired my={2}>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="firstName"
            value={participant.firstName}
            onChange={(e) => {
              setParticipant({ ...participant, firstName: e.target.value });
            }}
          />
        </FormControl>
        <FormControl isRequired my={2}>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            name="lastName"
            value={participant.lastName}
            onChange={(e) => {
              setParticipant({ ...participant, lastName: e.target.value });
            }}
          />
        </FormControl>
        <FormControl my={2}>
          <FormLabel>Check In</FormLabel>
          <Input
            type="text"
            name="checkInKey"
            value={participant.checkInKey}
            onChange={(e) => {
              setParticipant({ ...participant, checkInKey: e.target.value });
            }}
          />
        </FormControl>
        <FormControl my={2}>
          <FormLabel>mail</FormLabel>
          <Input
            type="text"
            name="email"
            value={participant.email}
            onChange={(e) => {
              setParticipant({ ...participant, email: e.target.value });
            }}
          />
        </FormControl>
        <FormControl my={2}>
          <FormLabel>Phone</FormLabel>
          <Input
            type="text"
            name="phone"
            value={participant.phone}
            onChange={(e) => {
              setParticipant({ ...participant, phone: e.target.value });
            }}
          />
        </FormControl>

        {attributeValues.map((attribute) => (
          <FormControl my={2} key={attribute.id}>
            <FormLabel>{attribute.name}</FormLabel>
            <Input
              type="text"
              name={attribute.name}
              value={attributeValues.find((value) => value.id === attribute.id)?.value || ''}
              onChange={(e) => {
                setAttributeValues((prev) => {
                  const index = prev.findIndex((value) => value.id === attribute.id);
                  if (index === -1) {
                    return [
                      ...prev,
                      {
                        id: attribute.id,
                        value: e.target.value,
                      },
                    ];
                  }
                  return prev.map((value) => {
                    if (value.id === attribute.id) {
                      return {
                        ...value,
                        value: e.target.value,
                      };
                    }
                    return value;
                  });
                });
              }}
            />
          </FormControl>
        ))}

        {/* Add more form fields as needed */}
        <Button type="submit" width="100%" my="4" isLoading={loading} loadingText="Please Wait">
          Update
        </Button>
      </form>
    </DashboardLayout>
  );
}
