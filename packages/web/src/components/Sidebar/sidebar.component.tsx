import { memo, useCallback, useEffect, useRef } from 'react';
import SidebarLink, { SidebarLinkProps } from '../SidebarLink/sidebarlink.component';
import { House, User, Heart, SignOut, PlusCircle, MagnifyingGlass, Car } from 'phosphor-react';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../../store/user/user.slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { SideBarProps } from '../../types/index.types';
import { selectFavoritesCount } from '../../store/favorites/favorites.selector';
import SearchMinified, { SearchMinifiedHandlers } from '../Search/search-minified.component';
import { selectMyAdsCount } from '../../store/ad/ad.selector';

const Sidebar = memo(function ({ setShowComponent }: SideBarProps) {
  const searchMinifiedRef = useRef<SearchMinifiedHandlers>(null);
  const favoritesCount = useSelector(selectFavoritesCount);
  const myAdsCount = useSelector(selectMyAdsCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, sendRequest } = useHttpRequest<{ message: string; status: number }>();
  const location = useLocation();
  const sidebarLinks: SidebarLinkProps[] = [
    {
      label: 'Home',
      isLink: true,
      href: '/',
      icon: <House className="w-6 h-6 text-white group-hover:text-black" />,
      isActive: false,
    },
    {
      label: 'Search',
      isLink: false,
      icon: <MagnifyingGlass className="w-6 h-6 text-white group-hover:text-black" />,
      isActive: false,
    },
    {
      label: 'Sell Your Car',
      isLink: true,
      href: '/auto/add',
      isActive: false,
      icon: <PlusCircle className="w-6 h-6 text-white group-hover:text-black" />,
      setShowComponent: () => {},
    },
    {
      icon: (
        <div className="relative">
          <Car className="w-6 h-6 text-white group-hover:text-black relative" />
          {myAdsCount > 0 && (
            <p className="absolute -top-2 left-4 py-[1px] px-1 w-5 h-5 rounded-xl flex items-center justify-center bg-yellow-400 text-black">
              {myAdsCount}
            </p>
          )}
        </div>
      ),
      label: 'My Ads',
      isLink: true,
      href: '/ad/me',
      isActive: false,
    },
    {
      icon: (
        <div className="relative">
          <Heart className="w-6 h-6 text-white group-hover:text-black relative" />
          {favoritesCount > 0 && (
            <p className="absolute -top-2 left-4 py-[1px] px-1 w-5 h-5 rounded-xl flex items-center justify-center bg-yellow-400 text-black">
              {favoritesCount}
            </p>
          )}
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
    <>
      <SearchMinified ref={searchMinifiedRef} />
      <div className="hidden md:flex h-screen w-full md:max-w-[100px] lg:max-w-[150px] bg-[#1f1f1f] flex-col items-center justify-center">
        <ul className="flex flex-col space-y-10">
          {sidebarLinks.map((link) => (
            <SidebarLink
              key={link.label}
              label={link.label}
              icon={link.icon}
              href={link.href}
              isLink={link.isLink}
              onClick={() => {
                link.label === 'Sign Out' && handleLogoutRequest();
                link.label === 'Search' && searchMinifiedRef.current?.display();
              }}
              isActive={location?.pathname === link.href}
              setShowComponent={setShowComponent}
            />
          ))}
        </ul>
      </div>
    </>
  );
});

export default Sidebar;
