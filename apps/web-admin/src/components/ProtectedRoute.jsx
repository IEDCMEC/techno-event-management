import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner, VStack, AbsoluteCenter } from '@chakra-ui/react';
export const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    loginWithRedirect({
      authorizationParams: {
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      },
    });
  };

  if (!isLoading) {
    if (!isAuthenticated && router.pathname !== '/auth') router.replace('/');
    else if (isAuthenticated && !user.email_verified) {
      router.push('/onboarding/verify-email');
      return children;
    }
    return children;
  }

  return (
    <div>
      <AbsoluteCenter>
        <VStack>
          <Spinner boxSize={70} thickness="7px" speed="0.9s" color="purple" emptyColor="grey" />
        </VStack>
      </AbsoluteCenter>
    </div>
  );
};
