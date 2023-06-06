import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { useState } from 'react';
import { forwardRef } from 'react';
import { ShowComponentProps } from '../../types/index.types';
// import { ModalProps } from "../../types/index.types";

export type ModalHandlers = {
  display: () => void;
};

type ModalProps = {
  hasCloseButton: boolean;
  title: string;
  setShowComponent: ({ componentName, show }: ShowComponentProps) => void;
};

const Modal: React.ForwardRefRenderFunction<ModalHandlers, ModalProps> = (
  { setShowComponent, hasCloseButton, title },
  ref,
) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          setIsOpen(false);
          setShowComponent({
            componentName: '',
            show: false,
          });
        }}
        className="bg-neutral-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0, translateX: '-100%' }}
          animate={{ opacity: 1, scale: 1, translateX: '0%' }}
          exit={{ opacity: 0, scale: 0, translateX: '+100%' }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 text-white px-3 py-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <p className="text-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium vel nostrum molestiae, repudiandae nobis
            quibusdam ab tempore eveniet quam commodi?
            {title}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
