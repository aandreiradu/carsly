import { useRef } from 'react';
import AuthLayout from '../../components/Layouts/Auth/auth.layout';
import { Link } from 'react-router-dom';
import { AddressBook, Envelope, Eye } from 'phosphor-react';

const SignUp = () => {
  const passwordRef = useRef<HTMLInputElement>(null);

  const showPassword = () => {
    console.log('change triggered');
    if (passwordRef.current) {
      console.log('changed');
      if (passwordRef.current.type === 'text') {
        console.log('changed to password');
        passwordRef.current.type = 'password';
      } else {
        console.log('changed to text');
        passwordRef.current.type = 'text';
      }
    }
  };

  return (
    <AuthLayout
      title="Create new account"
      hasRedirectLink={true}
      redirectComponent={
        <>
          {' '}
          <p className="text-white capitalize text-base font-kanit">
            already a member?{' '}
            <Link className="text-yellow-300" to="/">
              Log in
            </Link>
          </p>
        </>
      }
    >
      <form className="mt-8 flex py-4 flex-col w-full  md:max-w-lg overflow-hidden">
        <div className="w-full flex flex-wrap md:flex-nowrap gap-3 md:gap-5 items-center justify-between">
          {/* First name */}
          <div className="flex-1 py-1 px-1 bg-yellow-300 flex rounded-xl h-14 w-full md:max-w-[245px]">
            <div className="pl-1 flex flex-col w-4/5">
              <label htmlFor="firstName" className="text-xs p-1">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                className="text-black border-none focus:outline-none active:outline-none bg-transparent px-1"
              />
            </div>
            <div className="flex h-full items-center justify-end w-1/5">
              <AddressBook className="w-6 h-10" color="#000" />
            </div>
          </div>

          {/* Last name */}
          <div className="flex-1 py-1 px-1 bg-yellow-300 flex rounded-xl h-14 w-full md:max-w-[245px]">
            <div className="pl-1 flex flex-col w-4/5">
              <label htmlFor="lastName" className="text-xs p-1">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                className="text-black border-none focus:outline-none active:outline-none bg-transparent px-1"
              />
            </div>
            <div className="flex h-full items-center justify-end w-1/5">
              <AddressBook className="w-6 h-10" color="#000" />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex-1 my-3 py-1 px-1 bg-yellow-300 flex rounded-xl h-14 w-full ">
          <div className="pl-1 flex flex-col w-4/5">
            <label htmlFor="email" className="text-xs p-1">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="text-black border-none focus:outline-none active:outline-none bg-transparent px-1"
            />
          </div>
          <div className="flex h-full items-center justify-end w-1/5">
            <Envelope className="w-6 h-10" color="#000" />
          </div>
        </div>

        {/* Password */}
        <div className="flex-1 my-3 py-1 px-1 bg-yellow-300 flex rounded-xl h-14 w-full ">
          <div className="pl-1 flex flex-col w-4/5">
            <label htmlFor="password" className="text-xs p-1">
              Password
            </label>
            <input
              ref={passwordRef}
              id="password"
              type="password"
              className="text-black border-none focus:outline-none active:outline-none bg-transparent px-1"
            />
          </div>
          <div className="flex h-full items-center justify-end w-1/5">
            <Eye className="cursor-pointer w-6 h-10" color="#000" onClick={showPassword} />
          </div>
        </div>

        <button
          type="submit"
          className="my-3 bg-default-yellow text-black border-none px-2 py-4 rounded-lg shadow-sm shadow-yellow-300/50 hover:bg-default-gray hover:text-white ease-in hover:shadow-none"
        >
          Create account
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
