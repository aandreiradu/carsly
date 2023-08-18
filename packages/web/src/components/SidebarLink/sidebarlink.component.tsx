import { Dispatch, FC, ReactNode, SetStateAction, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowComponentProps } from '../../types/index.types';

export type SidebarLinkProps = {
  icon: ReactNode;
  label: string;
  isLink?: boolean;
  href?: string;
  onClick?: () => void;
  isActive: boolean;
  setShowComponent?: Dispatch<SetStateAction<ShowComponentProps>>;
};

const SidebarLink: FC<SidebarLinkProps> = ({ icon, href, isLink, onClick, isActive, setShowComponent, label }) => {
  const navigate = useNavigate();

  console.log({
    label,
    icon,
  });

  const clickHandler = useCallback(() => {
    if (isLink) {
      if (onClick) {
        onClick();
      }

      if (href) {
        navigate(href);
      }
    } else {
      if (typeof setShowComponent !== 'undefined') {
        setShowComponent({
          show: true,
          componentName: label,
        });
      }
    }

    if (onClick) {
      onClick();
    }
  }, []);

  return (
    <li
      className={`cursor-pointer p-2 ${isActive ? 'bg-yellow-400' : 'bg-transparent'} rounded-md hover:bg-yellow-400 group`}
      onClick={clickHandler}
    >
      {icon}
    </li>
  );
};

export default SidebarLink;
