import { useCallback, useState } from 'react';
import SidebarLink, { SidebarLinkProps } from '../SidebarLink/sidebarlink.component';
import { House, User, Heart, SignOut } from 'phosphor-react';

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
  const [activeLink, setActiveLink] = useState(sidebarLinks[0].label);

  const activeLinkHandler = useCallback((label: string) => {
    setActiveLink(label);
  }, []);

  return (
    <div className="h-full w-full md:max-w-[150px] bg-[#1f1f1f] flex flex-col items-center justify-center">
      <ul className="flex flex-col space-y-10">
        {sidebarLinks.map((link) => (
          <SidebarLink
            key={link.label}
            label={link.label}
            icon={link.icon}
            href={link.href}
            isLink={link.isLink}
            onClick={activeLinkHandler.bind(this, link.label)}
            isActive={activeLink === link.label ? true : false}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
