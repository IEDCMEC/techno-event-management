import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';
import useWrapper from '@/hooks/useWrapper';

export default function NewExtraForm({ onClose }) {
  // Accept onClose to close the modal
  const { loading, post } = useFetch();
  const showAlert = useAlert();
  const router = useRouter();
  const { orgId, eventId } = router.query;

  const [name, setName] = useState('');
  const { useGetQuery, usePostMutation } = useWrapper();
  const { mutate: handleExtraMutation } = usePostMutation(
    `/core/organizations/${orgId}/events/${eventId}/extras`,
    {},
    {
      onSuccess: (response) => {
        showAlert({
          title: 'Success',
          description: 'Extra has been added successfully.',
          status: 'success',
        });
        onClose(); // Close the modal after success
        router.push(`/${orgId}/events/${eventId}/extras`); // Redirect to extras list
      },
      onError: (error) => {
        showAlert({
          title: 'Error',
          description: error,
          status: 'error',
        });
      },
      invalidateKeys: [`/core/organizations/${orgId}/events/${eventId}/extras`],
    },
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleExtraMutation({
      name,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired my={4}>
        <FormLabel>Name</FormLabel>
        <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <Button
        type="submit"
        width="100%"
        my="4"
        isLoading={loading}
        loadingText="Please Wait"
        colorScheme="teal"
      >
        Add
      </Button>
    </form>
  );
}
