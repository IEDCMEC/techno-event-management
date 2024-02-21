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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, status } = await post(
      `/core/organizations/${orgId}/events/${eventId}/participants`,
      {},
      {
        firstName,
        lastName,
      },
    );
    if (status === 200) {
      router.push(`/organizations/${orgId}/events/${eventId}/participants`);
    } else {
      alert(data.error);
    }
  };

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
