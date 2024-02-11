import { useRouter } from 'next/router';

import { useState } from 'react';

import { useFetch } from '@/hooks/useFetch';

import { Box, Flex, Text, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';
import { useEffect } from 'react';

export default function Settings() {
  const { loading, get, put } = useFetch();

  const [accountDetails, setAccountDetails] = useState({});

  useEffect(() => {
    const fetchAccountDetails = async () => {
      const { data, status } = await get('/core/users/me');
      setAccountDetails(data.accountDetails || []);
    };
    fetchAccountDetails();
  }, []);

  const updateAccountDetails = async () => {
    const { data, status } = await put('/core/users/me', {}, accountDetails);
    if (status === 200) {
      alert('Account details updated successfully');
      setAccountDetails(data.accountDetails || []);
    } else {
      alert('Failed to update account details');
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
        <Box width="100%" p={8} display="flex" justifyContent="space-between">
          <Text fontSize="4xl" fontWeight="bold">
            Settings
          </Text>
          <Button
            padding="4"
            minWidth="-moz-initial"
            bgColor="rgb(128, 90, 213)"
            color="white"
            _hover={{ bgColor: 'rgb(100, 70, 183)' }}
          >
            Add Organization
          </Button>
        </Box>
        <Box width="100%" height="100%">
          <Box width="100%" height="100%">
            <Text fontSize="2xl" fontWeight="bold">
              Account Settings
            </Text>
            {JSON.stringify(accountDetails)}
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
                  value={accountDetails.firstName}
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
                  value={accountDetails.lastName}
                  onChange={(e) => {
                    setAccountDetails({ ...accountDetails, lastName: e.target.value });
                  }}
                />
              </FormControl>
            </Box>
            <Button onClick={updateAccountDetails}>Save</Button>
          </Box>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
