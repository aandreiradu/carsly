import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';
import _axios from '../../api/axios/axios';
import useAxiosInterceptors from '../useAxiosInterceptors/useAxiosInterceptors.hook';

export interface HttpRequestResult<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  sendRequest: (url: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<T> | void>;
  setError: (error: Error | null) => void;
}

const useHttpRequest = <T,>(): HttpRequestResult<T> => {
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
      if (axios.isAxiosError(error)) {
        console.log('Error AXIOS', error.response);
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
