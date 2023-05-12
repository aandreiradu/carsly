import Sidebar from '../../Sidebar/sidebar.component';
import { FC, ReactNode } from 'react';

export interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="h-screen flex bg-[#2f2e2e]">
      <Sidebar />
      {children}
    </main>
  );
};

export default MainLayout;
