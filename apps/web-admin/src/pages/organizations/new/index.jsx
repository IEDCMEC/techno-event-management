import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';

export default function NewOrganization() {
  const { loading, post } = useFetch();
  const showAlert = useAlert();

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
      showAlert({
        title: 'Success',
        description: 'Organization has been created successfully.',
        status: 'success',
      });
      router.push('/organizations');
    } else {
      showAlert({
        title: 'Error',
        description: data.error,
        status: 'error',
      });
    }
  };

  return (
    <DashboardLayout pageTitle="Create Organization" previousPage={`/organizations`}>
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
        <Button type="submit" width="100%" my="4" isLoading={loading} loadingText="Please Wait">
          Add
        </Button>
      </form>
    </DashboardLayout>
  );
}
