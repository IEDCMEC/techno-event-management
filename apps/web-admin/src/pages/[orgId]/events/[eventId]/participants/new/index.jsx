import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';

export default function NewParticipant() {
  const { loading, post, get } = useFetch();
  const showAlert = useAlert();

  const router = useRouter();
  const { orgId, eventId } = router.query;

  const [attributes, setAttributes] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkInKey, setCheckInKey] = useState('');
  const [attributeValues, setAttributeValues] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    attributeValues.forEach((attribute) => {
      if (!attribute.value) {
        setAttributeValues((prev) => {
          const index = prev.findIndex((value) => value.id === attribute.id);
          if (index !== -1) {
            return prev.filter((value) => value.id !== attribute.id);
          }
          return prev;
        });
      }
    });

    const { data, status } = await post(
      `/core/organizations/${orgId}/events/${eventId}/participants`,
      {},
      {
        firstName,
        lastName,
        email,
        phone,
        checkInKey,
        attributes: attributeValues,
      },
    );
    if (status === 200) {
      showAlert({
        title: 'Success',
        description: 'Participant has been added successfully.',
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

  useEffect(() => {
    const fetchAttributes = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/attributes`,
      );
      if (status === 200) {
        setAttributes(data.attributes);
        setAttributeValues(data.attributes.map((attribute) => ({ id: attribute.id })));
      }
    };
    fetchAttributes();
  }, [orgId, eventId]);

  return (
    <DashboardLayout
      pageTitle="Add Participant"
      previousPage={`/organizations/${orgId}/events/${eventId}/participants`}
      debugInfo={JSON.stringify(attributeValues)}
    >
      <form onSubmit={handleSubmit}>
        <FormControl isRequired my={4}>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired my={4}>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="text"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <FormLabel>Phone</FormLabel>
        <Input
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <FormLabel>Check In Key</FormLabel>
        <Input
          type="text"
          name="checkInKey"
          value={checkInKey}
          onChange={(e) => {
            setCheckInKey(e.target.value);
          }}
        />
        {attributes.map((attribute) => (
          <FormControl my={4} key={attribute.id}>
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
        <Button type="submit" width="100%" my="4" isLoading={loading} loadingText="Please Wait">
          Add
        </Button>
      </form>
    </DashboardLayout>
  );
}
