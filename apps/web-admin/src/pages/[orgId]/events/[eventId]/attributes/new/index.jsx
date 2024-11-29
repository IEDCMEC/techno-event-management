import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';
import useWrapper from '@/hooks/useWrapper';

export default function NewAttributeForm({ onClose }) {
  const { loading, post } = useFetch();
  const showAlert = useAlert();
  const router = useRouter();
  const { orgId, eventId } = router.query;
  // const [orgId, setOrgId] = useState(null);
  // const [eventId, setEventId] = useState(null);
  // // const [attributeId, setAtrributeId] = useState(null);

  // useEffect(() => {
  //   if (router.isReady) {
  //     setOrgId(router.query.orgId);
  //     setEventId(router.query.eventId);
  //     // setAtrributeId(router.query.attributeId);
  //   }
  // }, [router.isReady, router.query]);

  const [name, setName] = useState('');
  const { usePostMutation } = useWrapper();
  const { mutate: handleAttributeMutation } = usePostMutation(
    `/core/organizations/${orgId}/events/${eventId}/attributes`,
    {},
    {
      onSuccess: () => {
        showAlert({
          title: 'Success',
          description: 'Attribute has been added successfully.',
          status: 'success',
        });
        onClose();
        router.push(`/${orgId}/events/${eventId}/attributes`);
      },
      onError: (error) => {
        showAlert({
          title: 'Error',
          description: error,
          status: 'error',
        });
      },
      invalidateKeys: [`/core/organizations/${orgId}/events/${eventId}/attributes`],
    },
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAttributeMutation({ name });
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
