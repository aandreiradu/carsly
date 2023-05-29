import { useCallback, useEffect, useState } from 'react';
import SidebarLink, { SidebarLinkProps } from '../SidebarLink/sidebarlink.component';
import { House, User, Heart, SignOut } from 'phosphor-react';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { LogoutSuccessResponse } from '../../types/auth.types';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../store/user/user.slice';
import { useNavigate } from 'react-router-dom';

const sidebarLinks: SidebarLinkProps[] = [
  {
    icon: <House className="w-6 h-6 text-white hover:text-black" />,
    label: 'Home',
    isLink: true,
    href: '/',
    isActive: true,
  },
  {
    icon: <User className="w-6 h-6 text-white hover:text-black" />,
    label: 'My Profile',
    isLink: true,
    href: '/me',
    isActive: false,
  },
  {
    icon: <Heart className="w-6 h-6 text-white hover:text-black" />,
    label: 'My Favorites',
    isLink: true,
    href: '/favorites',
    isActive: false,
  },
  {
    icon: <SignOut className="w-6 h-6 text-white hover:text-black" />,
    label: 'Sign Out',
    isLink: false,
    href: '/sign-in',
    isActive: false,
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, sendRequest } = useHttpRequest<LogoutSuccessResponse>();
  const [activeLink, setActiveLink] = useState(sidebarLinks[0].label);

  const activeLinkHandler = useCallback((label: string) => {
    setActiveLink(label);
  }, []);

  const handleLogoutRequest = useCallback(async () => {
    console.log('called');
    await sendRequest('/auth/logout', {
      method: 'GET',
      withCredentials: true,
    });
  }, []);

  useEffect(() => {
    if (data) {
      const { message, status } = data;

      if (status === 200 && message === 'ok') {
        dispatch(setAccessToken({ accessToken: '' }));
      }

      return navigate('/signin', { replace: true });
    }

    if (error) {
      dispatch(setAccessToken({ accessToken: '' }));
      return navigate('/signin', { replace: true });
    }
  }, [error, data]);

  return (
    <div className="hidden md:flex h-full w-full md:max-w-[100px] lg:max-w-[150px] bg-[#1f1f1f] flex-col items-center justify-center">
      <ul className="flex flex-col space-y-10">
        {sidebarLinks.map((link) => (
          <SidebarLink
            key={link.label}
            label={link.label}
            icon={link.icon}
            href={link.href}
            isLink={link.isLink}
            onClick={
              // link.onClick
              () => {
                activeLinkHandler.bind(this, link.label);
                link.label === 'Sign Out' && handleLogoutRequest();
              }
            }
            isActive={activeLink === link.label ? true : false}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
