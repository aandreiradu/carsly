import { FC, ReactNode } from 'react';
import { cn } from '../../../utils/styling.utils';

export interface MainLayoutProps {
  children?: ReactNode;
  className?: string;
}

const MainLayout: FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <main className={cn('h-screen md:overflow-hidden flex flex-col md:flex-row bg-[#2f2e2e]', className)}>{children}</main>
  );
};

export default MainLayout;
