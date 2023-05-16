import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

export interface HttpReqRes<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  sendRequest: (url: string, options: AxiosRequestConfig) => Promise<void | AxiosResponse>;
}

const useHttpRequest = <T,>(): HttpReqRes<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const sendRequest = useCallback(async (url: string, options: AxiosRequestConfig = {}) => {
    try {
      const response: AxiosResponse<T> = await axios(url, options);
      setData(response.data);
      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error);
      } else {
        setError(new Error('An unknown error occurred.'));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    error,
    loading,
    sendRequest,
  };
};

export default useHttpRequest;
