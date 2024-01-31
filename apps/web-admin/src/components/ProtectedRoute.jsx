import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth0 } from '@auth0/auth0-react';

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
  return <div>Please wait while our awesome app is loading</div>;
};
