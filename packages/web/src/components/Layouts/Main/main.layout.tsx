import Sidebar from "../../Sidebar/sidebar.component";
import { FC, ReactNode } from "react";

export interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="w-full h-screen flex bg-purple-700">
      <Sidebar />
      {children}
    </main>
  );
};

export default MainLayout;
