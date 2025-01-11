import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const get = async (endpoint: string = ''): Promise<{ data: any; status: number } | null> => {
    setLoading(true);
    try {
      const { data, status }: AxiosResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
      );

      setLoading(false);
      return { data, status };
    } catch (err) {
      console.error(err);
      setLoading(false);
      if (axios.isAxiosError(err) && err.response) {
        console.error(`Error: ${err.response.status} - ${err.response.statusText}`);
        return { data: err.response.data, status: err.response.status };
      } else {
        console.error('Error: Unable to process the request.');
        return null;
      }
    }
  };

  const post = async (
    endpoint: string = '',
    body: Record<string, any> = {},
  ): Promise<{ data: any; status: number } | null> => {
    setLoading(true);
    try {
      const { data, status }: AxiosResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        body,
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
