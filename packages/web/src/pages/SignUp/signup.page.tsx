import { useEffect, useRef, useState } from 'react';
import AuthLayout from '../../components/Layouts/Auth/auth.layout';
import { Link, useNavigate } from 'react-router-dom';
import { AddressBook, Check, Envelope, Eye, Warning } from 'phosphor-react';
import { Input } from '../../components/UI/Input/input.component';
import useHttpRequest, { HttpReqRes } from '../../hooks/useHttpRequest/useHttp.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { registerSchema, RegisterProps } from '../../schema/signup.schema';
import { AuthAccountCreated } from '../../types/auth.types';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../../components/UI/TopLevelNotification/topLevelNotification.component';
import statsAndMaps from '../../config/mappedstats.config';
import { PulseLoader } from 'react-spinners';
import { showPassword } from '../SignIn/signin.page';

const SignUp = () => {
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<RegisterProps>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
  });
  const { error, loading, sendRequest }: HttpReqRes<AuthAccountCreated> = useHttpRequest<AuthAccountCreated>();
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      submitButtonRef.current && (submitButtonRef.current.disabled = false);
      const { message } = error;
      console.log('message is', message);
      topLevelNotificationRef.current?.display({
        icon: <Warning className="w-14 h-8 text-red-500" />,
        message: message,
      });
    }
  }, [error]);

  const onSubmit: SubmitHandler<RegisterProps> = async (data) => {
    submitButtonRef.current && (submitButtonRef.current.disabled = true);
    const response = await sendRequest('/auth/local/signup', {
      method: 'POST',
      data: data,
      withCredentials: false,
    });

    if (response) {
      submitButtonRef.current && (submitButtonRef.current.disabled = false);
      const { isSuccess, message } = response.data;
      if (isSuccess && message === statsAndMaps['accountCreatedSuccessfully'].message) {
        topLevelNotificationRef.current?.display({
          message: 'Account created successfully',
          icon: <Check className="w-14 h-8 text-green-400" />,
        });

        setTimeout(() => {
          navigate('/signin');
        }, 5500);
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
            <Link className="text-yellow-300" to="/signin">
              Sign In
            </Link>
          </p>
        </>
      }
    >
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />)
      <form
        id="register"
        className="mt-8 flex flex-col w-full  md:max-w-lg overflow-hidden"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-wrap md:flex-nowrap gap-3 md:gap-5 items-center justify-between">
          {/* First name */}
          <div className="flex-1 py-1 px-1 bg-yellow-300 flex rounded-xl h-14 w-full md:max-w-[245px]">
            <div className="pl-1 flex flex-col w-4/5">
              <Input
                {...register('firstName')}
                label="First Name"
                id="firstName"
                type="text"
                className={`text-black border-none focus:outline-none active:outline-none bg-transparent px-1 ${
                  errors.firstName?.message && 'border-red-500'
                }`}
                error={errors.firstName?.message}
                required
              />
            </div>
            <div className="flex h-full items-center justify-end w-1/5">
              <AddressBook className="w-6 h-10" color="#000" />
            </div>
          </div>

          {/* Last name */}
          <div className="flex-1 py-1 px-1 bg-yellow-300 flex rounded-xl h-14 w-full md:max-w-[245px]">
            <div className="pl-1 flex flex-col w-4/5">
              <Input
                {...register('lastName')}
                label="Last Name"
                id="lastName"
                type="text"
                className={`text-black border-none focus:outline-none active:outline-none bg-transparent px-1 ${
                  errors.lastName?.message && 'border-red-500'
                }`}
                error={errors.lastName?.message}
                required
              />
            </div>
            <div className="flex h-full items-center justify-end w-1/5">
              <AddressBook className="w-6 h-10" color="#000" />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex-1 my-3 mt-5 py-1 px-1 bg-yellow-300 flex rounded-xl h-14 w-full ">
          <div className="pl-1 flex flex-col w-4/5">
            <Input
              {...register('email')}
              label="Email"
              id="email"
              type="text"
              className={`text-black border-none focus:outline-none active:outline-none bg-transparent px-1 ${
                errors.email?.message && 'border-red-500'
              }`}
              error={errors.email?.message}
              required
            />
          </div>
          <div className="flex h-full items-center justify-end w-1/5">
            <Envelope className="w-6 h-10" color="#000" />
          </div>
        </div>

        {/* Password */}
        <div className="flex-1 my-3 py-1 px-1 bg-yellow-300 flex rounded-xl h-14 w-full ">
          <div className="pl-1 flex flex-col w-4/5">
            <Input
              {...register('password')}
              className={`text-black border-none focus:outline-none active:outline-none bg-transparent px-1 ${
                errors.password?.message && 'border-red-500'
              }`}
              id="password"
              type="password"
              placeholder=" "
              autoComplete="false"
              spellCheck="false"
              label="Password"
              error={errors.password?.message}
              required
              // ref={passwordRef}
            />
          </div>
          <div className="flex h-full items-center justify-end w-1/5">
            <Eye className="cursor-pointer w-6 h-10" color="#000" onClick={showPassword.bind(this, passwordRef)} />
          </div>
        </div>

        {/*Confirm  Password */}
        <div className="flex-1 my-3 py-1 px-1 bg-yellow-300 flex rounded-xl h-14 w-full ">
          <div className="pl-1 flex flex-col w-4/5">
            <Input
              {...register('confirmPassword')}
              className={`text-black border-none focus:outline-none active:outline-none bg-transparent px-1 ${
                errors.confirmPassword?.message && 'border-red-500'
              }`}
              id="confirmPassword"
              type="password"
              placeholder=" "
              autoComplete="false"
              spellCheck="false"
              label="Confirm Password"
              error={errors.confirmPassword?.message}
              required
              // ref={confirmPasswordRef}
            />
          </div>
          <div className="flex h-full items-center justify-end w-1/5">
            <Eye className="cursor-pointer w-6 h-10" color="#000" onClick={showPassword.bind(this, confirmPasswordRef)} />
          </div>
        </div>

        <button
          ref={submitButtonRef}
          type="submit"
          form="register"
          className="my-3 bg-default-yellow text-black border-none px-2 py-4 rounded-lg shadow-sm shadow-yellow-300/50 hover:bg-default-gray hover:text-white ease-in hover:shadow-none"
        >
          {loading ? <PulseLoader color="#1f1f1f" /> : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
