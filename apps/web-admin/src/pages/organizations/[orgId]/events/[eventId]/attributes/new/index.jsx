import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';

export default function NewAttribute() {
  const { loading, post } = useFetch();
  const showAlert = useAlert();

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
      showAlert({
        title: 'Success',
        description: 'Attribute has been added successfully.',
        status: 'success',
      });
      router.push(`/organizations/${orgId}/events/${eventId}/attributes`);
    } else {
      showAlert({
        title: 'Error',
        description: data.error,
        status: 'error',
      });
    }
  };

  return (
    <DashboardLayout
      pageTitle="Add Attribute"
      previousPage={`/organizations/${orgId}/events/${eventId}/attributes`}
    >
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
        <Button type="submit" width="100%" my="4" isLoading={loading} loadingText="Please Wait">
          Add
        </Button>
      </form>
    </DashboardLayout>
  );
}
