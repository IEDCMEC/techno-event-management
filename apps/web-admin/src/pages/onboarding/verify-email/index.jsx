import { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';

import { Text, Flex } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

export default function VerifyEmail() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user.email_verified) router.push('/');
  }, [user, isAuthenticated, isLoading]);

  return (
    <DashboardLayout pageTitle="Email Not Verified" previousPage={`/`} debugInfo={user}>
      <Flex height="100%" width="100%" alignItems="center" justifyContent="center">
        <Text fontSize="3xl">
          Please verify your email to continue using the application. Do not forget to check the
          spam folder too.
        </Text>
      </Flex>
    </DashboardLayout>
  );
}
