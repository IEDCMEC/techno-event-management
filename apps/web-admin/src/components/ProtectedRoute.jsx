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
        audience: 'https://core.techno.iedcmec.in/api',
      },
    });
  };

  if (!isLoading) {
    if (!isAuthenticated && router.pathname !== '/auth') handleLogin();
    else return children;
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
