import { Dispatch, FC, ReactNode, SetStateAction, forwardRef, useCallback, useImperativeHandle } from 'react';
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
  ref?: React.RefObject<HTMLLIElement>;
};

const SidebarLink: FC<SidebarLinkProps> = ({ icon, href, isLink, onClick, isActive, setShowComponent, label }) => {
  // const SidebarLink = forwardRef<HTMLLIElement, SidebarLinkProps>(
  // ({ icon, href, isLink, onClick, isActive, setShowComponent, label }, ref) => {
  const navigate = useNavigate();

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
        console.log('here');
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
      // ref={ref}
      className={`cursor-pointer p-2 ${
        isActive ? 'bg-yellow-400' : 'bg-transparent'
      } rounded-md hover:bg-default-yellow group`}
      onClick={clickHandler}
    >
      {icon}
    </li>
  );
};
// );

export default SidebarLink;
