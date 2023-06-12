import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { SellNowProps } from '../../types/index.types';
import Modal from '../../components/Modal/modal.component';
import { sellNow__getYears } from '../../config/settings';
import Select from '../../components/Select/select.component';
import Label from '../../components/UI/Label/label.component';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { useSelector } from 'react-redux';
import { selectCarsBrands } from '../../store/cars/cars.selector';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SellNowStageOneProps, sellNowStageOne } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import ProgressBar from '../../components/ProgressBar/progressbar.component';

const maxStageLevel = +import.meta.env.VITE_MAX_STAGE_LEVEL_SELLNOW;
export type SellNowHandlers = {
  display: () => void;
  hide: () => void;
};

const sellNowYears = sellNow__getYears()
  .map((data) => ({ name: String(data) }))
  .reverse();

const SellNow = ({ setShowComponent, componentName, show }: SellNowProps) => {
  const [stageLevel, setStageLevel] = useState(1);
  const carsBrands = useSelector(selectCarsBrands);
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<SellNowStageOneProps>({
    resolver: zodResolver(sellNowStageOne),
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<SellNowStageOneProps> = async (data) => {
    console.log('data', data);
  };

  if (errors) {
    console.log('errors', errors);
  }

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
            className="relative"
          >
            <ProgressBar className="" currentLevel={stageLevel} maxLevel={maxStageLevel} />
            <form
              id="sellNow"
              className="mt-8 w-full flex flex-col /*lg:w-96 md:max-w-2xl*/ "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <div className="relative border border-black w-full py-1 px-1 bg-yellow-300 flex flex-col flex-1 rounded-xl max-h-16">
                    <Label className="text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1">
                      Year*
                    </Label>
                    <Controller
                      control={control}
                      name="year"
                      render={({ field: { onChange } }) => (
                        <Select onChange={(e: { name: string }) => onChange(e.name)} dataSource={sellNowYears} />
                      )}
                    />
                  </div>
                  <span className="text-sm text-red-500">{errors?.year?.message}</span>
                </div>
                <div className="flex flex-col">
                  <div className="relative border border-black w-full py-1 px-1 bg-yellow-300 flex flex-col flex-1 rounded-xl max-h-16">
                    <Label className="text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1">
                      Year*
                    </Label>
                    <Controller
                      control={control}
                      name="model"
                      render={({ field: { onChange } }) => (
                        <Select onChange={(e: { name: string }) => onChange(e.name)} dataSource={carsBrands} />
                      )}
                    />
                  </div>
                  <span className="text-sm text-red-500">{errors?.model?.message}</span>
                </div>
              </div>
              <button
                type="submit"
                // disabled={carsBrands?.length === 0 || sellNowYears?.length === 0}
                onClick={changeStageLevel}
                className="w-32 text-black text-base mx-auto mt-10  border  border-black p-2 rounded-lg disabled:bg-gray-500/25 disabled:border-none disabled:text-white disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </form>

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
