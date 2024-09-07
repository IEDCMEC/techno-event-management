import { useRouter } from 'next/router';
import { useContext } from 'react';
import { account } from '@/contexts/MyContext';

import { Box, Flex, Text, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

export default function Settings() {
  //const { loading, get, put } = useFetch();
  //const showAlert = useAlert();
  const { accountDetails, setAccountDetails, updateAccountDetails } = useContext(account);

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
