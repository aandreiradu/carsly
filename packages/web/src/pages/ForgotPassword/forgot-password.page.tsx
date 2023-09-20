import { Check, Info, Password, Warning } from 'phosphor-react';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../../components/UI/TopLevelNotification/topLevelNotification.component';
import { ClipLoader } from 'react-spinners';
import { useCallback, useEffect, useRef } from 'react';
import { useZodForm } from '../../hooks/useZodForm/useZodForm.hook';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { ForgotPasswordSchema, forgotPasswordSchema } from './forgot-password.schema';
import { SubmitHandler } from 'react-hook-form';
import { Input } from '../../components/UI/Input/input.component';
import { useNavigate, useParams } from 'react-router-dom';

export interface ResetPasswordBadReq {
  statusCode: number;
  message: string;
  error: string;
}

const ForgotPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  const forgotPasswordForm = useZodForm({
    schema: forgotPasswordSchema,
  });
  const { sendRequest, loading } = useHttpRequest<ResetPasswordBadReq | void>();
  const {
    sendRequest: postNewPassword,
    loading: loadingNewPassword,
    error: errorNewPassword,
  } = useHttpRequest<
    | ResetPasswordBadReq
    | {
        message: { error: string; field: string }[] | string;
      }
    | void
  >();

  const checkTokenValidity = useCallback(async (token: string) => {
    const tokenValidity = await sendRequest(`/auth/reset-password/verify/${token}`, {
      method: 'GET',
      withCredentials: false,
    });

    if (tokenValidity?.data) {
      const { error, message, statusCode } = tokenValidity.data;

      if (statusCode === 401 && message === 'Invalid token' && error) {
        console.log('invalid token here');

        topLevelNotificationRef?.current?.display({
          icon: <Warning className="w-14 h-8 text-red-600" />,
          message: `${message ?? 'Invalid or expired token'}`,
        });

        setTimeout(() => {
          return navigate('/account/reset-password', { replace: true });
        }, 5500);
      }
    }
  }, []);

  useEffect(() => {
    if (!token) {
      return navigate('/account/reset-password', { replace: true });
    } else {
      checkTokenValidity(token);
    }
  }, [token]);

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = async (data) => {
    const { password, confirmPassword } = data;

    const newPasswordRes = await postNewPassword(`/auth/reset-password?token=${token}`, {
      method: 'POST',
      withCredentials: false,
      data: {
        password,
        confirmPassword,
      },
    });

    if (newPasswordRes) {
      const { data, status } = newPasswordRes;
      if (status >= 400) {
        if (typeof data?.message === 'object') {
          const { message } = data;
          for (let i = 0; i < message.length; i++) {
            forgotPasswordForm.setError(message[i].field as any, { message: String(message[i].error) });
          }
        } else if (typeof data?.message === 'string') {
          topLevelNotificationRef?.current?.display({
            icon: <Info className="w-14 h-8 text-red-600" />,
            message: `${errorNewPassword?.message ?? data?.message}`,
          });
        } else {
          topLevelNotificationRef.current?.display({
            icon: <Info className="w-14 h-8 text-red-600" />,
            message: `'Someting went wrong. Please try again later'`,
          });
        }
      } else if (status === 201) {
        forgotPasswordForm.resetField('password');
        forgotPasswordForm.resetField('confirmPassword');
        topLevelNotificationRef?.current?.display({
          icon: <Check className="w-14 h-8 text-green-400" />,
          message: `Your password has been changed successfully.`,
        });

        setTimeout(() => {
          return navigate('/signin', { replace: true });
        }, 3500);
      }
    }
  };

  return (
    <>
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
      <header className="h-12 flex items-center justify-center md:justify-start md:px-36 uppercase font-kanit font-bold border-b border-gray-200/40 shadow-md">
        Carlsy
      </header>
      <main className="grid h-[90vh] place-items-center my-auto">
        <div className="flex flex-col border border-black max-w-sm w-full rounded-lg">
          <div className="p-4 pb-0 flex flex-col">
            <div className="mx-auto w-24 h-24 grid place-items-center rounded-full mb-4 border-2 border-black">
              <Password color="black" className="w-16 h-16" />
            </div>
            <h3 className="font-bold text-lg text-center">Trouble logging in?</h3>
            <p className="text-center text-base text-gray-400">
              Enter your email and we'll send you a link to get back into your account.
            </p>

            <form className="pb-4" id="reset-password" onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}>
              <Input
                {...forgotPasswordForm.register('password')}
                placeholder="New Password"
                className="rounded-md my-4 w-full mb-4"
                type="password"
                disabled={loading || loadingNewPassword}
                error={forgotPasswordForm?.formState?.errors?.password?.message}
              />
              <Input
                {...forgotPasswordForm.register('confirmPassword')}
                placeholder="Confirm New Password"
                className="rounded-md my-4 w-full mb-4"
                type="password"
                disabled={loading || loadingNewPassword}
                error={forgotPasswordForm.formState.errors.confirmPassword?.message}
              />
              <button
                disabled={loading || loadingNewPassword}
                className="my-4 md:mb-0 md:mt-auto w-full p-1 h-10 flex items-center justify-center bg-yellow-400 text-black rounded-md cursor-pointer"
              >
                {loading || loadingNewPassword ? <ClipLoader color="black" size={25} /> : 'Reset password'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPasswordPage;
