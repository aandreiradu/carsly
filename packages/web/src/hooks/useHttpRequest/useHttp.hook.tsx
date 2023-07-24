import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import _axios from '../../api/axios/axios';
import useAxiosInterceptors from '../useAxiosInterceptors/useAxiosInterceptors.hook';

export interface HttpReqRes<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  sendRequest: (url: string, options: AxiosRequestConfig) => Promise<void | AxiosResponse>;
  setError?: Dispatch<SetStateAction<Error | null>>;
}

const useHttpRequest = <T,>(): HttpReqRes<T | AxiosError> => {
  const axiosInterceptors = useAxiosInterceptors();
  const [data, setData] = useState<T | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const sendRequest = useCallback(async (url: string, options: AxiosRequestConfig = {}) => {
    try {
      if (data || error) {
        setData(null);
        setError(null);
      }

      setIsLoading(true);
      const response = await axiosInterceptors<T>(url, options);
      setData(response.data);
      return response;
    } catch (error: unknown) {
      if (error) {
        console.log('error axios', error);
      }
      if (axios.isAxiosError(error)) {
        setError(new Error(error.response?.data.message || error.response?.data.error || 'Something went wrong'));
        return error.response;
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
    setError,
  };
};

export default useHttpRequest;
