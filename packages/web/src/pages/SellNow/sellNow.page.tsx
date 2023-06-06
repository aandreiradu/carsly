import React, { useRef } from 'react';
import { SellNowProps } from '../../types/index.types';
import Modal from '../../components/Modal/modal.component';

const SellNow = ({ setShowComponent, componentName, show }: SellNowProps) => {
  type DisplayHandle = React.ElementRef<typeof SellNow>;
  const sellNowRef = useRef<DisplayHandle>(null);
  return (
    <>
      {show && componentName === 'Sell Now' && (
        <>
          <Modal setShowComponent={setShowComponent} hasCloseButton={false} title="test" />
        </>
      )}
    </>
  );
};

export default SellNow;
