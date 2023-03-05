import { useEffect, useState } from 'react';
import { RequestParams } from '@/types/apiModel';
import { api } from './api';

export const baseUrl = process.env.BASE_URL;

export const useApi = <T>({ method, url, body, params }: RequestParams) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(method === 'GET');
  const [error, setError] = useState<unknown>();

  const get = async () => {
    setError(undefined);
    try {
      const response = await api.get(url, params);
      setData(response.json() as T);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const request = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await api.request({ method, url, body, params });
      setData(response.json() as T);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const refetch = () => {
    if (method === 'GET') {
      setIsLoading(true);
      get();
    } else {
      request();
    }
  };

  useEffect(() => {
    if (!data && method === 'GET') {
      get();
    }
  }, []);

  return { data, isLoading, error, request, refetch };
};
