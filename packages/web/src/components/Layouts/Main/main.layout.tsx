import { FC, ReactNode } from 'react';

export interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return <main className="h-screen md:overflow-hidden flex flex-col md:flex-row bg-[#2f2e2e]">{children}</main>;
};

export default MainLayout;
