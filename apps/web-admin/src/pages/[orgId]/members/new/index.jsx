import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';

export default function NewMemberForm({ onClose }) {
  const { loading, post } = useFetch();
  const showAlert = useAlert();
  const router = useRouter();
  const { orgId } = router.query;

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, status } = await post(
      `/core/organizations/${orgId}/members`,
      {},
      {
        email,
        role,
      },
    );
    if (status === 200) {
      showAlert({
        title: 'Success',
        description: 'Member added successfully',
        status: 'success',
      });
      onClose();
      router.push(`/${orgId}/members`);
    } else {
      showAlert({
        title: 'Error',
        description: data.error,
        status: 'error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired my={4}>
        <FormLabel>Email</FormLabel>
        <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <FormLabel>Role</FormLabel>
        <Select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </Select>
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
