import { Fragment, memo, useCallback, useEffect, useRef } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { List, X, User, Heart, Car } from 'phosphor-react';
import { SidebarLinkProps } from '../SidebarLink/sidebarlink.component';
import { SideBarProps } from '../../types/index.types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { setAccessToken } from '../../store/user/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavoritesCount } from '../../store/favorites/favorites.selector';
import SearchMinified, { SearchMinifiedHandlers } from '../Search/search-minified.component';
import { selectMyAdsCount } from '../../store/ad/ad.selector';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Nav = memo(function ({ showOnAllScreens }: SideBarProps) {
  const location = useLocation();
  const searchMinifiedRef = useRef<SearchMinifiedHandlers>(null);
  const favoritesCount = useSelector(selectFavoritesCount);
  const myAdsCount = useSelector(selectMyAdsCount);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, error, sendRequest } = useHttpRequest<{ message: string; status: number }>();

  const navigationLinks: Partial<SidebarLinkProps>[] = [
    {
      label: 'Home',
      isLink: true,
      href: '/',
      isActive: false,
    },
    {
      label: 'Search',
      isLink: false,
      isActive: false,
      onClick: () => searchMinifiedRef.current?.display(),
    },
    {
      label: 'Sell Your Car',
      isLink: true,
      isActive: false,
      href: '/auto/add',
    },
    {
      label: 'My Profile',
      isLink: true,
      href: '/me',
      isActive: false,
    },
    {
      label: `My Ads - ${myAdsCount > 0 ? myAdsCount : ''}`,
      icon: <Car weight="fill" className="w-4 h-4 text-white group-hover:text-black relative ml-1" />,
      isLink: true,
      href: '/ad/me',
      isActive: false,
    },
    {
      label: `My Favorites - ${favoritesCount > 0 ? favoritesCount : ''}`,
      icon: <Heart weight="fill" className="w-4 h-4 text-white group-hover:text-black relative ml-1" />,
      isLink: true,
      href: '/favorites',
      isActive: false,
    },
  ];

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

  const handleLogoutRequest = useCallback(async () => {
    await sendRequest('/auth/logout', {
      method: 'GET',
      withCredentials: true,
    });
  }, []);

  return (
    <>
      <SearchMinified ref={searchMinifiedRef} />
      <Disclosure as="nav" className={`z-50 ${showOnAllScreens ? '' : 'md:hidden'} bg-[#1f1f1f] w-full h-16`}>
        {({ open, close }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className={`flex-1 relative inset-y-0 left-0 flex items-center ${showOnAllScreens ? '' : 'md:hidden'}`}>
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <X className="block h-6 w-6" color="#fff" aria-hidden="true" />
                    ) : (
                      <List className="block h-6 w-6" color="#fff" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                  <div className="flex flex-shrink-0 items-center justify-center text-center">
                    <h1 className="text-white font-kanit uppercase tracking-widest text-xl">carsly</h1>
                  </div>
                </div>
                <div className="relative inset-y-0 right-0 flex flex-1 items-center justify-end pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button
                        className="flex rounded-full bg-default-gray text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={() => open && close()} // if menu is open, close it before opening the profile dropdown
                      >
                        <span className="sr-only">Open user menu</span>
                        <User className="h-8 w-8 rounded-full" color="#fff" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={'/account'}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogoutRequest}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block w-full text-left px-4 py-2 text-sm text-gray-700',
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className={`relative z-50 ${showOnAllScreens ? '' : 'md:hidden'} bg-[#1f1f1f]`}>
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigationLinks.map((item) =>
                  item.isLink ? (
                    <Link
                      key={item.label}
                      to={item.href ?? '/home'}
                      className={classNames(
                        location?.pathname === item.href
                          ? 'bg-default-yellow text-black'
                          : 'text-gray-300 hover:bg-default-yellow hover:text-black',
                        'rounded-md px-3 py-2 text-base font-medium flex items-center',
                      )}
                      aria-current={item.isActive ? 'page' : undefined}
                    >
                      {item.label} {item?.icon}
                    </Link>
                  ) : (
                    <Disclosure.Button
                      key={item.label}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.isActive
                          ? 'bg-default-yellow text-black'
                          : 'text-gray-300 hover:bg-default-yellow hover:text-black',
                        'rounded-md px-3 py-2 text-base font-medium flex items-center',
                      )}
                      aria-current={item.isActive ? 'page' : undefined}
                      onClick={item.onClick}
                    >
                      {item.label} {item?.icon}
                    </Disclosure.Button>
                  ),
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
});

export default Nav;
