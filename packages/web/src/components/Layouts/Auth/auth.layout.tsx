import { FC, ReactNode } from 'react';

export interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  headingText?: string;
  hasRedirectLink?: boolean;
  redirectComponent: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, redirectComponent, title, hasRedirectLink, headingText }) => {
  return (
    <section className="relative bg-[linear-gradient(to_right_bottom,rgba(0,0,0,1),rgba(254,254,254,.2)),url('./landing-1.jpg')] bg-center bg-no-repeat bg-cover h-screen w-full flex items-center px-2 md:px-16 lg:px-24">
      <div className="w-full lg:w-fit flex flex-col bg-[rgba(0,0,0,.5)] rounded-2xl px-2 py-3 lg:px-3 lg:py-4 ">
        <span className=" text-white uppercase text-xl font-bold font-kanit">{headingText || 'start for free'}</span>
        <h1 className="w-fit relative inline-block text-white tracking-widest font-kanit font-bold text-xl lg:text-3xl my-2">
          {title || 'Create new account'}
          <span className="absolute bottom-1 left-full ml-1 inline-block w-3 h-3 rounded-full bg-default-yellow"></span>
        </h1>

        {hasRedirectLink && <>{redirectComponent}</>}

        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
