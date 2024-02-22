import { useState, useEffect } from 'react';

import { useFetch } from '@/hooks/useFetch';

import {
  Button,
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Select,
} from '@chakra-ui/react';

import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';

export default function NewOrganization() {
  const { loading, get, post } = useFetch();

  const router = useRouter();

  const { orgId, eventId } = router.query;

  const [attributes, setAttributes] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attributeValues, setAttributeValues] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, status } = await post(
      `/core/organizations/${orgId}/events/${eventId}/participants`,
      {},
      {
        firstName,
        lastName,
        attributes: attributeValues,
      },
    );
    if (status === 200) {
      router.push(`/organizations/${orgId}/events/${eventId}/participants`);
    } else {
      alert(data.error);
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
    <DashboardLayout>
      <Flex
        direction="column"
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        gap={8}
      >
        <Box textAlign="center">
          <Text fontSize="3xl" fontWeight="bold">
            Add new participant
          </Text>
        </Box>
        <Card width="100%" maxWidth="400px" height="auto">
          <CardBody>
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
              <Button
                type="submit"
                width="100%"
                my="4"
                isLoading={loading}
                loadingText="Please Wait"
              >
                Add
              </Button>
            </form>
          </CardBody>
        </Card>
      </Flex>
    </DashboardLayout>
  );
}
