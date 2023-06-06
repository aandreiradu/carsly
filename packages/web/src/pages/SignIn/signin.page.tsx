import { useEffect, useRef } from 'react';
import AuthLayout from '../../components/Layouts/Auth/auth.layout';
import { Link, useNavigate } from 'react-router-dom';
import { Envelope, Eye, Warning } from 'phosphor-react';
import { Input } from '../../components/UI/Input/input.component';
import useHttpRequest, { HttpReqRes } from '../../hooks/useHttpRequest/useHttp.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../../components/UI/TopLevelNotification/topLevelNotification.component';
import { PulseLoader } from 'react-spinners';
import { SignInProps, signinSchema } from '../../schema/signin.schema';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../store/user/user.slice';
import { SignInResponse } from './types';

export const showPassword = (ref: React.RefObject<HTMLInputElement>) => {
  if (ref) {
    if (ref.current) {
      if (ref.current.type === 'text') {
        ref.current.type = 'password';
      } else {
        ref.current.type = 'text';
      }
    }
  }
};

const SignIn = () => {
  const dispatch = useDispatch();
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInProps>({
    resolver: zodResolver(signinSchema),
    mode: 'onSubmit',
  });
  const { data, error, loading, sendRequest }: HttpReqRes<SignInResponse> = useHttpRequest<SignInResponse>();
  const passwordRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      console.log('data received back', data);
      submitButtonRef.current && (submitButtonRef.current.disabled = false);
      const { accessToken, firstName } = data;
      if (accessToken) {
        dispatch(setAuthData({ accessToken, firstName }));
        navigate('/');
      }
    }

    if (error) {
      submitButtonRef.current && (submitButtonRef.current.disabled = false);
      const { message } = error;

      if (topLevelNotificationRef) {
        topLevelNotificationRef.current?.display({
          icon: <Warning className="w-14 h-8 text-red-500" />,
          message: message,
        });
      }
    }
  }, [error, data]);

  const onSubmit: SubmitHandler<SignInProps> = async (data) => {
    console.log('data', data);
    submitButtonRef.current && (submitButtonRef.current.disabled = true);
    await sendRequest('/auth/local/signin', {
      method: 'POST',
      data: data,
      withCredentials: true,
    });
  };

  return (
    <AuthLayout
      title="Log In"
      hasRedirectLink={true}
      redirectComponent={
        <>
          {' '}
          <p className="text-white capitalize text-base font-kanit">
            Don't have an account ?{' '}
            <Link className="text-yellow-300" to="/signup">
              Sign Up
            </Link>
          </p>
        </>
      }
    >
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />

      <form
        id="register"
        className="mt-8 flex flex-col w-full lg:w-96 md:max-w-2xl overflow-hidden"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Email */}
        <div className="flex-1 my-3 mt-5 py-1 px-1 bg-yellow-300 flex rounded-xl h-14">
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

        <button
          ref={submitButtonRef}
          type="submit"
          form="register"
          className="my-3 bg-default-yellow text-black border-none px-2 py-4 rounded-lg shadow-sm shadow-yellow-300/50 hover:bg-default-gray hover:text-white ease-in hover:shadow-none"
        >
          {loading ? <PulseLoader color="#1f1f1f" /> : 'Sign In'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
