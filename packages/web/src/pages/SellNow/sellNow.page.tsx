import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { SellNowProps } from '../../types/index.types';
import Modal from '../../components/Modal/modal.component';
import { Input } from '../../components/UI/Input/input.component';
import { sellNow__getYears } from '../../config/settings';
import Select from '../../components/Select/select.component';
import Label from '../../components/UI/Label/label.component';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { useSelector } from 'react-redux';
import { selectCarsBrands } from '../../store/cars/cars.selector';

const maxStageLevel = +import.meta.env.VITE_MAX_STAGE_LEVEL_SELLNOW;
export type SellNowHandlers = {
  display: () => void;
  hide: () => void;
};

const sellNowYears = sellNow__getYears()
  .map((data) => ({ name: data }))
  .reverse();

const SellNow = ({ setShowComponent, componentName, show }: SellNowProps) => {
  // const { data, sendRequest, error } = useHttpRequest();
  const [stageLevel, setStageLevel] = useState(1);
  const carsBrands = useSelector(selectCarsBrands);

  const changeStageLevel = useCallback(async () => {
    if (stageLevel === maxStageLevel || stageLevel > maxStageLevel) {
      setStageLevel(1);
      return;
    }
    if (stageLevel < maxStageLevel) {
      setStageLevel((prev) => prev + 1);
    }
  }, [stageLevel]);

  return (
    <>
      {show && componentName === 'Sell Now' && (
        <>
          <Modal
            setShowComponent={setShowComponent}
            hasCloseButton={true}
            title="Sell Your Car Now"
            onClose={() => setStageLevel(1)}
          >
            <form id="sellNow" className="mt-8 w-full flex flex-col /*lg:w-96 md:max-w-2xl*/ ">
              <div className="w-full grid grid-cols-2 gap-5">
                <div className="relative border border-black w-full py-1 px-1 bg-yellow-300 flex flex-col flex-1 rounded-xl max-h-16">
                  <Label className="text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1">
                    Year*
                  </Label>
                  <Select dataSource={sellNowYears} />
                </div>
                <div className="relative border border-black w-full py-1 px-1 bg-yellow-300 flex flex-col flex-1 rounded-xl max-h-16">
                  <Label className="text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1">
                    Model*
                  </Label>
                  <Select dataSource={carsBrands} />
                </div>
              </div>
            </form>
            <button
              disabled={carsBrands?.length === 0 || sellNowYears?.length === 0}
              onClick={changeStageLevel}
              className="w-32 text-black text-base mx-auto mt-10  border  border-black p-2 rounded-lg disabled:bg-gray-500/25 disabled:border-none disabled:text-white disabled:cursor-not-allowed"
            >
              Continue
            </button>

            <span className="mx-auto text-black mt-3 text-xs">
              Step {stageLevel} / {maxStageLevel}
            </span>
          </Modal>
        </>
      )}
    </>
  );
};

export default SellNow;
