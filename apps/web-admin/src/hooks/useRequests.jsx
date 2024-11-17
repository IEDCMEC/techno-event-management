import { useState } from 'react';
// import { useQueryClient } from 'react-query';
import axios from 'axios';

import { useAuth0 } from '@auth0/auth0-react';

export const useRequests = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [loading, setLoading] = useState(false);

  const get = async (endpoint = '', headers = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + endpoint, {
        headers: {
          ...headers,
          contentType: 'application/json',
          Authorization:
            'Bearer ' +
            (await getAccessTokenSilently({
              authorizationParams: {
                audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
              },
            })),
        },
        validateStatus: () => true,
      });

      // Update React Query cache
      // queryClient.setQueryData(endpoint, response.data);

      setLoading(false);

      return response;
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  };

  const post = async (endpoint = '', headers = {}, body = {}, contentType = 'application/json') => {
    // const queryClient = useQueryClient(); // React Query client instance
    setLoading(true);
    try {
      const { data, status } = await axios.post(process.env.NEXT_PUBLIC_API_URL + endpoint, body, {
        headers: {
          ...headers,
          contentType: contentType,
          Authorization:
            'Bearer ' +
            (await getAccessTokenSilently({
              authorizationParams: {
                audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
              },
            })),
        },
        validateStatus: () => true,
      });

      // Invalidate queries to refetch updated data
      // queryClient.invalidateQueries(endpoint);

      setLoading(false);

      return { data, status };
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  };

  const put = async (endpoint = '', headers = {}, body = {}) => {
    // const queryClient = useQueryClient(); // React Query client instance
    setLoading(true);
    try {
      const { data, status } = await axios.put(process.env.NEXT_PUBLIC_API_URL + endpoint, body, {
        headers: {
          ...headers,
          contentType: 'application/json',
          Authorization:
            'Bearer ' +
            (await getAccessTokenSilently({
              authorizationParams: {
                audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
              },
            })),
        },
        validateStatus: () => true,
      });

      // Invalidate queries to refetch updated data

      setLoading(false);

      return { data, status };
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  };

  const del = async (endpoint = '', headers = {}) => {
    // const queryClient = useQueryClient(); // React Query client instance
    setLoading(true);
    try {
      const { data, status } = await axios.delete(process.env.NEXT_PUBLIC_API_URL + endpoint, {
        headers: {
          ...headers,
          contentType: 'application/json',
          Authorization:
            'Bearer ' +
            (await getAccessTokenSilently({
              authorizationParams: {
                audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
              },
            })),
        },
        validateStatus: () => true,
      });

      // Invalidate queries to refetch updated data
      // queryClient.invalidateQueries(endpoint);

      setLoading(false);

      return { data, status };
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  };

  return { loading, get, post, put, del };
};
