import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, ReactNode, forwardRef, useEffect, useImperativeHandle, useState } from 'react';

export type TopLevelNotificationRef = {
  display: () => void;
};

interface ITopLevelNotification {
  message: string;
  dismissAfterXMs: number;
  hasCloseButton: boolean;
  closeBtnMessage?: string;
  show: boolean;
  onClose(): void;
  icon?: ReactNode;
}

// const TopLevelNotification: FC<ITopLevelNotification> = ({
//   dismissAfterXMs,
//   message,
//   hasCloseButton,
//   onClose,
//   show = false,
//   icon = null,
// }) => {
const TopLevelNotification = forwardRef<TopLevelNotificationRef, ITopLevelNotification>(
  ({ dismissAfterXMs, hasCloseButton, message, show, onClose, closeBtnMessage, icon }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
      console.log('isOpen is', isOpen);
    }, [isOpen]);

    const display = (): void => setIsOpen(true);

    useImperativeHandle(ref, () => ({
      display,
    }));

    console.log('render child');

    useEffect(() => {
      console.log('running effect for hideAfterXMs');

      const timeout = setTimeout(() => {
        onClose();
      }, dismissAfterXMs);

      return () => {
        clearTimeout(timeout);
      };
    }, [dismissAfterXMs]);

    if (!isOpen) {
      console.log('hide');
      return null;
    }

    console.log('dont hide');

    return (
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                      {icon && icon}
                      {/* <p className="flex-1 text-base">{message}</p> */}
                      <p className="flex-1 text-base">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, earum?
                      </p>
                    </div>
                  </Dialog.Title>
                  {hasCloseButton && (
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={onClose}
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
