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

  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, status } = await post(
      '/core/organizations',
      {},
      {
        id,
        name,
      },
    );
    if (status === 200) {
      router.push('/organizations');
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
            Add new organization
          </Text>
        </Box>
        <Card width="100%" maxWidth="400px" height="auto">
          <CardBody>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired my={4}>
                <FormLabel>ID</FormLabel>
                <Input
                  type="id"
                  name="id"
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired my={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="name"
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
    </DashboardLayout>
  );
}
