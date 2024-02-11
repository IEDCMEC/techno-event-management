import { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';

export default function VerifyEmail() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user.email_verified) router.push('/');
  }, [user, isAuthenticated, isLoading]);

  return (
    <div>
      <h1>Please verify your email</h1>
    </div>
  );
}
