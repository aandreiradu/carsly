import { useCallback, useEffect, useRef, useState } from 'react';
import SidebarLink, { SidebarLinkProps } from '../SidebarLink/sidebarlink.component';
import { House, User, Heart, SignOut, PlusCircle } from 'phosphor-react';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { LogoutSuccessResponse } from '../../types/auth.types';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../store/user/user.slice';
import { useNavigate } from 'react-router-dom';
import { SideBarProps } from '../../types/index.types';

const sidebarLinks: SidebarLinkProps[] = [
  {
    label: 'Home',
    isLink: true,
    href: '/',
    icon: <House className="w-6 h-6 text-white group-hover:text-black" />,
    isActive: true,
  },
  {
    label: 'Sell Now',
    isLink: false,
    isActive: false,
    icon: <PlusCircle className="w-6 h-6 text-white group-hover:text-black" />,
    setShowComponent: () => {},
  },
  {
    icon: <User className="w-6 h-6 text-white group-hover:text-black" />,
    label: 'My Profile',
    isLink: true,
    href: '/me',
    isActive: false,
  },
  {
    icon: <Heart className="w-6 h-6 text-white group-hover:text-black" />,
    label: 'My Favorites',
    isLink: true,
    href: '/favorites',
    isActive: false,
  },
  {
    icon: <SignOut className="w-6 h-6 text-white group-hover:text-black" />,
    label: 'Sign Out',
    isLink: false,
    href: '/sign-in',
    isActive: false,
  },
];

const Sidebar = ({ setShowComponent }: SideBarProps) => {
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
            // ref={sellNowRef}
            isActive={activeLink === link.label ? true : false}
            setShowComponent={setShowComponent}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
