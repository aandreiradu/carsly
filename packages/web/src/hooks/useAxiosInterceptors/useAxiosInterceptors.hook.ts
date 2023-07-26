import { useEffect } from 'react';
import _axios from '../../api/axios/axios';
import { useSelector } from 'react-redux';
import useRefreshToken from '../useRefreshToken/useRefreshToken.hook';
import { selectAccessToken } from '../../store/user/user.selector';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';

const useAxiosInterceptors = () => {
  const { accessToken } = useSelector(selectAccessToken);
  const refresh = useRefreshToken();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = _axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (config?.headers) {
        if (!config.headers['Authorization']) {
          // console.log('no authorization token in header, will attach this', accessToken);
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
      } else {
        console.log('no headers availalbe');
      }
      return config;
    });

    const responseInterceptor = _axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const previousReq = error.config;
        //@ts-ignore
        if (error.response?.status === 403 && error.response.data?.message === 'Forbidden' && previousReq) {
          console.log('responseInterceptor /// 403 branch');

          const { accessToken, errorMessage } = await refresh();

          if (errorMessage) {
            Promise.reject(errorMessage);
          }

          if (accessToken) {
            // console.log('responseInterceptor /// new access token received');
            if (previousReq?.headers) {
              // console.log('attached the new access token to headers');
              previousReq.headers.Authorization = `Bearer ${accessToken}`;
            }
            return _axios(previousReq);
          }
        } else if (error.response?.status === 401) {
          // console.log('responseInterceptor /// 401 branch');
          const message = error.response.data;

          if (message === 'Unauthorized') {
            navigate('/signin', { replace: true });
            return;
          }

          navigate('/signin', { replace: true });
          return;
        }

        return Promise.reject(error);
      },
    );

    return () => {
      _axios.interceptors.request.eject(responseInterceptor);
      _axios.interceptors.response.eject(requestInterceptor);
    };
  }, [refresh, accessToken]);

  return _axios;
};

export default useAxiosInterceptors;
