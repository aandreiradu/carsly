import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';
import _axios from '../../api/axios/axios';

export interface HttpReqRes<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  sendRequest: (url: string, options: AxiosRequestConfig) => Promise<void | AxiosResponse>;
}

const useHttpRequest = <T,>(): HttpReqRes<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const sendRequest = useCallback(async (url: string, options: AxiosRequestConfig = {}) => {
    try {
      setIsLoading(true);
      const response: AxiosResponse<T> = await _axios(url, options);
      setData(response.data);
      return response;
    } catch (error: unknown) {
      console.log('error axios', error);
      if (axios.isAxiosError(error)) {
        setError(new Error(error.response?.data.message || error.response?.data.error || 'Something went wrong'));
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
