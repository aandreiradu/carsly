import { memo, useCallback, useEffect, useState } from 'react';
import SidebarLink, { SidebarLinkProps } from '../SidebarLink/sidebarlink.component';
import { House, User, Heart, SignOut, PlusCircle } from 'phosphor-react';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../../store/user/user.slice';
import { useNavigate } from 'react-router-dom';
import { SideBarProps } from '../../types/index.types';
import { selectFavoritesCount } from '../../store/favorites/favorites.selector';

const Sidebar = memo(function ({ setShowComponent }: SideBarProps) {
  const favoritesCount = useSelector(selectFavoritesCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, sendRequest } = useHttpRequest();
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
      isLink: true,
      href: '/auto/add',
      isActive: false,
      icon: <PlusCircle className="w-6 h-6 text-white group-hover:text-black" />,
      setShowComponent: () => {},
    },
    {
      icon: (
        <div className="relative">
          <Heart className="w-6 h-6 text-white group-hover:text-black relative" />
          <p className="absolute -top-2 left-4 py-[1px] px-1 w-5 h-5 rounded-xl flex items-center justify-center bg-yellow-400 text-white">
            {favoritesCount}
          </p>
        </div>
      ),
      label: 'My Favorites',
      isLink: true,
      href: '/favorites',
      isActive: false,
    },
    {
      icon: <User className="w-6 h-6 text-white group-hover:text-black" />,
      label: 'My Profile',
      isLink: true,
      href: '/me',
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
  const [activeLink, setActiveLink] = useState(sidebarLinks[0].label);

  const activeLinkHandler = useCallback((label: string) => {
    setActiveLink(label);
  }, []);

  const handleLogoutRequest = useCallback(async () => {
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
            onClick={() => {
              activeLinkHandler(link.label);
              link.label === 'Sign Out' && handleLogoutRequest();
            }}
            isActive={activeLink === link.label ? true : false}
            setShowComponent={setShowComponent}
          />
        ))}
      </ul>
    </div>
  );
});

export default Sidebar;
