import { useCallback } from 'react';
import _axios from '../../api/axios/axios';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { setAccessToken } from '../../store/user/user.slice';

export type RTResponse = {
  accessToken: string;
  errorMessage?: string;
};

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = useCallback(async (): Promise<RTResponse> => {
    try {
      const response = await _axios.get<RTResponse>('/auth/refresh', {
        withCredentials: true,
      });

      if (response?.status === 200) {
        const accessToken = response.data.accessToken;
        // console.log('accessToken received in useRefreshTOken', accessToken);

        if (!accessToken) {
          throw new Error('No access token received');
        }

        dispatch(setAccessToken({ accessToken }));
        return { accessToken };
      }
      // console.log('response from useRefreshToken', response);

      throw new Error('No token received');
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response?.data;

        if (!data) {
          throw new Error('Unexpected error occured');
        }

        console.log('Error axios instance', data);

        throw new Error(data.message);
      }

      if (error instanceof Error) {
        console.log('error', error.message);
        return { accessToken: '', errorMessage: error.message };
      }

      return { accessToken: '', errorMessage: 'Unexpected error occured' };
    }
  }, []);

  return refresh;
};

export default useRefreshToken;
