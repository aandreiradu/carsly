import { FC, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export type SidebarLinkProps = {
  icon: ReactNode;
  label: string;
  isLink?: boolean;
  href?: string;
  onClick?: () => void;
  isActive: boolean;
};

const SidebarLink: FC<SidebarLinkProps> = ({
  icon,
  href,
  isLink,
  onClick,
  isActive,
}) => {
  const navigate = useNavigate();

  const clickHandler = useCallback(() => {
    if (isLink) {
      if (onClick) {
        onClick();
      }

      if (href) {
        navigate(href);
      }
    }

    if (onClick) {
      onClick();
    }
  }, []);

  return (
    <li
      className={`cursor-pointer p-2 ${
        isActive ? "bg-white" : "bg-transparent"
      } rounded-md hover:bg-default-yellow`}
      onClick={clickHandler}
    >
      {icon}
    </li>
  );
};

export default SidebarLink;
