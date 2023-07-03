import { useCallback, useEffect, useState } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken/useRefreshToken.hook';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../store/user/user.selector';
import { AxiosError } from 'axios';

const Persist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const { accessToken: isAuth } = useSelector(selectAccessToken);
  let isMounted = true;

  const checkRefreshToken = useCallback(async () => {
    try {
      // console.log('calling refresh from persist componenet');
      await refresh();
    } catch (error) {
      // console.log('error checkRefreshToken', error);
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
    // console.log('Running Persist effect', isAuth);

    !isAuth ? checkRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return <>{isLoading ? 'Loading...' : <Outlet />}</>;
};

export default Persist;
