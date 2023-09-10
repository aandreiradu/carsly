import { useCallback, useEffect, useState } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken/useRefreshToken.hook';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../store/user/user.selector';
import { AxiosError } from 'axios';

const Persist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const { accessToken: isAuth } = useSelector(selectAccessToken);
  let isMounted = true;

  const checkRefreshToken = useCallback(async () => {
    try {
      await refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error?.response?.data;
        if (message === 'Unauthorized') {
          navigate('/signin');
        }
      }

      return navigate('/signin');
    } finally {
      isMounted && setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    !isAuth ? checkRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) return null;

  return <Outlet />;
};

export default Persist;
