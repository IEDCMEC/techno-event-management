import { AxiosResponse } from 'axios';

export interface UseFetchReturnType {
  loading: boolean;
  get: (endpoint?: string, headers?: Record<string, string>) => Promise<AxiosResponse | null>;
  post: (
    endpoint?: string,
    headers?: Record<string, string>,
    body?: Record<string, any>
  ) => Promise<AxiosResponse | null>;
  put: (
    endpoint?: string,
    headers?: Record<string, string>,
    body?: Record<string, any>
  ) => Promise<AxiosResponse | null>;
  del: (endpoint?: string, headers?: Record<string, string>) => Promise<AxiosResponse | null>;
}

export declare const useFetch: () => UseFetchReturnType;
