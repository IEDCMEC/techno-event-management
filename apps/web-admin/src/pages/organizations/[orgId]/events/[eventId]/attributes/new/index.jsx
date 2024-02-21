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

  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, status } = await post(
      `/core/organizations/${orgId}/events/${eventId}/attributes`,
      {},
      {
        name,
      },
    );
    if (status === 200) {
      router.push(`/organizations/${orgId}/events/${eventId}/attributes`);
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
        alignItems="start"
        justifyContent="start"
        gap={8}
      >
        <Box width="100%" p={8} display="flex" justifyContent="space-between">
          <Text fontSize="4xl" fontWeight="bold">
            Add New Attribute
          </Text>
        </Box>
        <Flex width="100%" justifyContent="center">
          <Card width="100%" maxWidth="400px" height="auto">
            <CardBody>
              <form onSubmit={handleSubmit}>
                <FormControl isRequired my={4}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
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
      </Flex>
    </DashboardLayout>
  );
}
