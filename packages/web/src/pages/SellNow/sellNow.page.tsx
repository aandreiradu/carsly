import React, { useRef } from 'react';
import { SellNowProps } from '../../types/index.types';
import Modal from '../../components/Modal/modal.component';
import { Input } from '../../components/UI/Input/input.component';
import { Envelope } from 'phosphor-react';

const SellNow = ({ setShowComponent, componentName, show }: SellNowProps) => {
  type DisplayHandle = React.ElementRef<typeof SellNow>;
  const sellNowRef = useRef<DisplayHandle>(null);
  return (
    <>
      {show && componentName === 'Sell Now' && (
        <>
          <Modal setShowComponent={setShowComponent} hasCloseButton={true} title="Sell Your Car Now">
            <form id="sellNow" className="mt-8 flex flex-col w-full lg:w-96 md:max-w-2xl overflow-hidden">
              <div className="flex-1 my-3 mt-5 py-1 px-1 bg-yellow-300 flex rounded-xl h-14">
                <div className="pl-1 flex flex-col w-4/5">
                  <Input
                    label="Email"
                    id="email"
                    type="text"
                    className={`text-black border-none focus:outline-none active:outline-none bg-transparent px-1`}
                    required
                  />
                </div>
                <div className="flex h-full items-center justify-end w-1/5">
                  <Envelope className="w-6 h-10" color="#000" />
                </div>
              </div>
            </form>
          </Modal>
        </>
      )}
    </>
  );
};

export default SellNow;
