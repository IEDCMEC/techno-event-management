import { useEffect, useState } from 'react';

import { useUser } from '@auth0/nextjs-auth0/client';

import axios from 'axios';

export const useAccessToken = () => {
  const { user, isLoading } = useUser();

  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (isLoading) return;

    if (!user) return;

    const fetchToken = async () => {
      const { data, status } = await axios.get('/api/auth/access-token', {
        validateStatus: () => true,
      });
      if (status === 200) {
        setAccessToken(data.accessToken);
      } else {
        setAccessToken(null);
      }
    };
    fetchToken();
  }, [user, isLoading]);

  return { accessToken };
};
