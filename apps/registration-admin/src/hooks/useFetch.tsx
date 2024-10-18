import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const get = async (
    endpoint: string = '',
    headers: Record<string, string> = {}
  ): Promise<{ data: any; status: number } | null> => {
    setLoading(true);
    try {
      const { data, status }: AxiosResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        {
          headers: {
            ...headers,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_BEARER}`,
          },
          validateStatus: () => true,
        }
      );

      setLoading(false);
      return { data, status };
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  };

  const post = async (
    endpoint: string = '',
    headers: Record<string, string> = {},
    body: Record<string, any> = {}
  ): Promise<{ data: any; status: number } | null> => {
    setLoading(true);
    try {
      const { data, status }: AxiosResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        body,
        {
          headers: {
            ...headers,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_BEARER}`,
          },
          validateStatus: () => true,
        }
      );

      setLoading(false);
      return { data, status };
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  };

  return { loading, get, post };
};
