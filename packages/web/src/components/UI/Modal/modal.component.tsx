import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useCallback } from 'react';
import { useState } from 'react';
import { ShowComponentProps } from '../../../types/index.types';
import { ArrowLeft, XCircle } from 'phosphor-react';
// import { ModalProps } from "../../types/index.types";

export type ModalHandlers = {
  display: () => void;
};

type ModalProps = {
  hasCloseButton: boolean;
  hasPrevButton?: boolean;
  title: string;
  setShowComponent: ({ componentName, show }: ShowComponentProps) => void;
  children?: ReactNode;
  onClose?: () => void;
  className?: string;
  onPrev?: () => void;
};

const Modal: React.ForwardRefRenderFunction<ModalHandlers, ModalProps> = (
  { setShowComponent, hasCloseButton, title, children, onClose, className, hasPrevButton, onPrev },
  _ref,
) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setShowComponent({
      componentName: '',
      show: false,
    });

    if (typeof onClose === 'function') {
      onClose();
    }
  }, []);

  const handlePrevButton = useCallback(() => {
    if (typeof onPrev === 'function') {
      onPrev();
    }
  }, []);

  return (
    <>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className={`${className}bg-neutral-900/20 backdrop-blur p-3 lg:p-8 fixed inset-0 z-50 grid place-items-center overflow-y-auto`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0, translateX: '-100%' }}
              animate={{ opacity: 1, scale: 1, translateX: '0%' }}
              exit={{ opacity: 0, scale: 0, translateX: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col overflow-hidden bg-white/80 text-black px-3 py-2 min-h-[72px] rounded-lg w-full max-w-lg shadow-xl cursor-default"
            >
              <p className="text-black text-center text-lg">{title}</p>
              {hasCloseButton && (
                <XCircle
                  onClick={handleClose}
                  width={32}
                  height={28}
                  className="absolute top-1 right-1 text-black cursor-pointer"
                />
              )}
              {hasPrevButton && (
                <ArrowLeft
                  onClick={handlePrevButton}
                  width={32}
                  height={28}
                  className="absolute top-1 left-1 text-black cursor-pointer"
                />
              )}

              {children}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Modal;
