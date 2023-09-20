import { Check, Info, LockSimple } from 'phosphor-react';
import { Input } from '../../components/UI/Input/input.component';
import { useZodForm } from '../../hooks/useZodForm/useZodForm.hook';
import { ForgotPasswordRequestTokenSchema, forgotPasswordRequestTokenSchema } from './forgot-password.schema';
import { Link } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { ClipLoader } from 'react-spinners';
import { useRef } from 'react';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../../components/UI/TopLevelNotification/topLevelNotification.component';

const ForgotPasswordRequestTokenPage = () => {
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  const forgotPasswordForm = useZodForm({
    schema: forgotPasswordRequestTokenSchema,
  });
  const { sendRequest, loading } = useHttpRequest<{
    message: { error: string; field: string }[] | string;
  }>();

  const onSubmit: SubmitHandler<ForgotPasswordRequestTokenSchema> = async (data) => {
    const { email } = data;

    const respToken = await sendRequest('/auth/reset-password/token', {
      method: 'POST',
      withCredentials: false,
      data: {
        email,
      },
    });

    if (respToken) {
      const { data, status } = respToken;
      if (status >= 400) {
        if (typeof data?.message === 'object') {
          const { message } = data;
          for (let i = 0; i < message.length; i++) {
            forgotPasswordForm.setError(message[i].field as any, { message: String(message[i].error) });
          }
        } else if (typeof data.message === 'string') {
          topLevelNotificationRef?.current?.display({
            icon: <Info className="w-14 h-8 text-red-600" />,
            message: `${data?.message}`,
          });
        } else {
          topLevelNotificationRef.current?.display({
            icon: <Info className="w-14 h-8 text-red-600" />,
            message: `'Someting went wrong. Please try again later'`,
          });
        }
        // }
      } else if (status === 201) {
        topLevelNotificationRef?.current?.display({
          icon: <Check className="w-14 h-8 text-green-400" />,
          message: `A reset password link was sent to your email. Please check your inbox.`,
        });
        forgotPasswordForm.resetField('email');
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
              <LockSimple color="black" className="w-16 h-16" />
            </div>
            <h3 className="font-bold text-lg text-center">Trouble logging in?</h3>
            <p className="text-center text-base text-gray-400">
              Enter your email and we'll send you a link to get back into your account.
            </p>

            <form id="reset-password-token" onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}>
              <Input
                {...forgotPasswordForm.register('email')}
                placeholder="Email"
                className="rounded-md my-4 w-full mb-4"
                type="email"
                error={forgotPasswordForm.formState.errors.email?.message}
                disabled={loading}
              />
              <button
                disabled={loading}
                className="my-4 md:mb-0 md:mt-auto w-full p-1 h-10 flex items-center justify-center bg-yellow-400 text-black rounded-md cursor-pointer"
              >
                {loading ? <ClipLoader color="black" size={25} /> : 'Send login link'}
              </button>
            </form>

            <div className="w-full flex items-center justify-center my-5">
              <hr className="flex-1" />
              <span className="mx-5">OR</span>
              <hr className="flex-1" />
            </div>
            <Link to="/signup" className="mx-auto text-center text-sm font-semibold font-kanit">
              Create new account
            </Link>
          </div>
          <Link
            to="/signin"
            className="w-full mt-8 md:mt-14 mx-auto text-center text-base font-kanit text-black bg-gray-200/40 font-medium p-3"
          >
            Back to login
          </Link>
        </div>
      </main>
    </>
  );
};

export default ForgotPasswordRequestTokenPage;
