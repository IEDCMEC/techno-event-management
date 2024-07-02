import { useRouter } from 'next/router';

import { useState } from 'react';

import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';

import { Box, Flex, Text, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';
import { useEffect } from 'react';

export default function Settings() {
  const { loading, get, put } = useFetch();
  const showAlert = useAlert();

  const [accountDetails, setAccountDetails] = useState({});

  useEffect(() => {
    const fetchAccountDetails = async () => {
      const { data, status } = await get('/core/users/me');
      setAccountDetails(data.accountDetails || {});
    };
    fetchAccountDetails();
  }, []);

  const updateAccountDetails = async () => {
    const { data, status } = await put('/core/users/me', {}, accountDetails);
    if (status === 200) {
      showAlert({
        title: 'Success',
        description: 'Account details updated successfully.',
        status: 'success',
      });
      setAccountDetails(data.accountDetails || {});
    } else {
      showAlert({
        title: 'Error',
        description: data.error,
        status: 'error',
      });
    }
  };

  return (
    <DashboardLayout pageTitle="Settings" previousPage={`/`} debugInfo={accountDetails}>
      <Box width="100%" height="100%">
        <Text fontSize="2xl" fontWeight="bold">
          Account Settings
        </Text>
        <Box width="100%" display="flex" flexDirection="column" justifyContent="start" gap={4}>
          <FormControl
            isRequired
            my={4}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={accountDetails.firstName || ''}
              onChange={(e) => {
                setAccountDetails({ ...accountDetails, firstName: e.target.value });
              }}
            />
          </FormControl>
          <FormControl
            isRequired
            my={4}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={accountDetails.lastName || ''}
              onChange={(e) => {
                setAccountDetails({ ...accountDetails, lastName: e.target.value });
              }}
            />
          </FormControl>
        </Box>
        <Button onClick={updateAccountDetails}>Save</Button>
      </Box>
    </DashboardLayout>
  );
}
