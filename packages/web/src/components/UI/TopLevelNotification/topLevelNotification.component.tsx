import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode, forwardRef, useEffect, useImperativeHandle, useState } from 'react';

type HandlersProps = {
  message: string;
  icon: ReactNode;
};

export type TopLevelNotificationHandlers = {
  display: (args: HandlersProps) => void;
  hide: () => void;
};

type ITopLevelNotification = {
  dismissAfterXMs: number;
  hasCloseButton: boolean;
  closeBtnMessage?: string;
};

const TopLevelNotification = forwardRef<TopLevelNotificationHandlers, ITopLevelNotification>(
  ({ dismissAfterXMs, hasCloseButton }, ref) => {
    const [notificationData, setNotificationData] = useState<{
      isOpen: boolean;
      message: string;
      icon: ReactNode;
    }>({
      isOpen: false,
      message: '',
      icon: <></>,
    });

    const display = (args: HandlersProps): void => {
      console.log('called dislpay with', args);
      setNotificationData((prev) => ({
        ...prev,
        isOpen: true,
        icon: args.icon,
        message: args.message,
      }));
    };

    const hide = (): void =>
      setNotificationData((prev) => ({
        ...prev,
        isOpen: false,
        icon: <></>,
        message: '',
      }));

    useImperativeHandle(ref, () => ({
      display,
      hide,
    }));

    useEffect(() => {
      const timeout = setTimeout(() => {
        console.log('timeout running', dismissAfterXMs);
        hide();
      }, dismissAfterXMs);

      return () => {
        clearTimeout(timeout);
      };
    }, [notificationData.isOpen]);

    if (!notificationData.isOpen) {
      return null;
    }

    return (
      <Transition appear show={notificationData.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[99]" onClose={hide}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto top-4">
            <div className="flex w-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-md transform overflow-hidden 
                                      rounded-2xl bg-white text-left align-middle 
                                      shadow-xl transition-all
                                      p-4"
                >
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    <div className="flex gap-2">
                      {notificationData.icon}
                      {/* <p className="flex-1 text-base">{message}</p> */}
                      <p className="flex-1 text-base">{notificationData.message}</p>
                    </div>
                  </Dialog.Title>
                  {hasCloseButton && (
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={hide}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  },
);

export default TopLevelNotification;
