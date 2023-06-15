import { useCallback, useRef, useState } from 'react';
import { SellNowProps } from '../../types/index.types';
import Modal from '../../components/Modal/modal.component';
import { sellNow__getYears } from '../../config/settings';
import Select from '../../components/Select/select.component';
import Label from '../../components/UI/Label/label.component';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { useDispatch, useSelector } from 'react-redux';
import { selectCarsBrands, selectModelsByBrandDataSource } from '../../store/cars/cars.selector';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SellNowStageOneProps, sellNowStageOne } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { PulseLoader } from 'react-spinners';
import { setModelsByBrand } from '../../store/cars/cars.slice';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../../components/UI/TopLevelNotification/topLevelNotification.component';
import { Info, Warning } from 'phosphor-react';

const maxStageLevel = +import.meta.env.VITE_MAX_STAGE_LEVEL_SELLNOW;
export type SellNowHandlers = {
  display: () => void;
  hide: () => void;
};

const sellNowYears = sellNow__getYears()
  .map((data) => ({ name: String(data) }))
  .reverse();

const SellNow = ({ setShowComponent, componentName, show }: SellNowProps) => {
  const {
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    getValues,
  } = useForm<SellNowStageOneProps>({
    resolver: zodResolver(sellNowStageOne),
    mode: 'onSubmit',
  });
  const dispatch = useDispatch();
  const { loading, sendRequest, error: fetchModelsByBrandError } = useHttpRequest();
  const [stageLevel, setStageLevel] = useState(1);
  const carsBrands = useSelector(selectCarsBrands);
  const brandModels = useSelector(selectModelsByBrandDataSource(getValues('model' ?? null)));
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  console.log('brandModels', brandModels);

  const onSubmit: SubmitHandler<SellNowStageOneProps> = async (data) => {
    console.log('data', data);
  };

  if (errors) {
    console.log('errors', errors);
  }

  const fetchModelsByBrand = useCallback(
    async (model: string) => {
      const contorller = new AbortController();
      return sendRequest(`/api/car/carmodel/${model}`, {
        method: 'GET',
        signal: contorller.signal,
      });
    },
    [getValues('model')],
  );

  const changeStageLevel = useCallback(async () => {
    if (stageLevel === maxStageLevel || stageLevel > maxStageLevel) {
      setStageLevel(1);
      return;
    }

    const model = getValues('model');
    const year = getValues('year');
    if (stageLevel < maxStageLevel && Object.keys(errors).length === 0 && model && year) {
      const respModels = await fetchModelsByBrand(model);
      if (respModels) {
        const { data, status } = respModels;
        if (status === 200 && data && data?.brandModels && data?.brand) {
          if (data.brandModels[data.brand].length === 0) {
            if (topLevelNotificationRef) {
              topLevelNotificationRef.current?.display({
                icon: <Info className="w-14 h-8 text-yellow-400" />,
                message: `No models were defined for ${model}. \n Please select another brand`,
              });
            }
            return;
          }
          dispatch(setModelsByBrand({ brand: data.brand, models: data.brandModels[data.brand] }));
          setStageLevel((prev) => prev + 1);
        } else {
          if (topLevelNotificationRef) {
            topLevelNotificationRef.current?.display({
              icon: <Warning className="w-14 h-8 text-red-500" />,
              message: 'Something went wrong when fetching your brand models. Please try again later',
            });
          }
        }
      }
    }
  }, [stageLevel]);

  if (fetchModelsByBrandError) {
    if (topLevelNotificationRef) {
      topLevelNotificationRef.current?.display({
        icon: <Warning className="w-14 h-8 text-red-500" />,
        message: fetchModelsByBrandError.message,
      });
    }
  }

  return (
    <>
      {show && componentName === 'Sell Now' && (
        <>
          <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
          <Modal
            setShowComponent={setShowComponent}
            hasCloseButton={true}
            hasPrevButton={stageLevel > 1 ? true : false}
            title="Sell Your Car Now"
            onClose={() => {
              setStageLevel(1);
              setValue('model', '');
              setValue('year', '');
            }}
            onPrev={() => {
              setStageLevel(1);
            }}
            className="relative"
          >
            <form
              id="sellNow"
              className="mt-8 w-full flex flex-col /*lg:w-96 md:max-w-2xl*/ "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full grid grid-cols-2 gap-5">
                {stageLevel === 1 && (
                  <>
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
                      <span className="lg:pl-1 text-sm text-red-500">{errors?.year?.message}</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="relative border border-black w-full py-1 px-1 bg-yellow-300 flex flex-col flex-1 rounded-xl max-h-16">
                        <Label className="text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1">
                          Brand*
                        </Label>
                        <Controller
                          control={control}
                          name="model"
                          render={({ field: { onChange } }) => (
                            <Select onChange={(e: { name: string }) => onChange(e.name)} dataSource={carsBrands} />
                          )}
                        />
                      </div>
                      <span className="lg:pl-1 text-sm text-red-500">{errors?.model?.message}</span>
                    </div>
                  </>
                )}
                {stageLevel === 2 && (
                  <>
                    <div className="flex flex-col">
                      <div className="relative border border-black w-full py-1 px-1 bg-yellow-300 flex flex-col flex-1 rounded-xl max-h-16">
                        <Label className="text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1">
                          Model*
                        </Label>
                        <Controller
                          control={control}
                          name="year"
                          render={({ field: { onChange } }) => (
                            <Select onChange={(e: { name: string }) => onChange(e.name)} dataSource={brandModels} />
                          )}
                        />
                      </div>
                      <span className="lg:pl-1 text-sm text-red-500">{errors?.year?.message}</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="relative border border-black w-full py-1 px-1 bg-yellow-300 flex flex-col flex-1 rounded-xl max-h-16">
                        <Label className="text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1">
                          Fuel*
                        </Label>
                        <Controller
                          control={control}
                          name="model"
                          render={({ field: { onChange } }) => (
                            <Select onChange={(e: { name: string }) => onChange(e.name)} dataSource={carsBrands} />
                          )}
                        />
                      </div>
                      <span className="lg:pl-1 text-sm text-red-500">{errors?.model?.message}</span>
                    </div>
                  </>
                )}
              </div>
              <button
                type="submit"
                // disabled={carsBrands?.length === 0 || sellNowYears?.length === 0}
                onClick={changeStageLevel}
                className="w-32 text-black text-base mx-auto mt-10  border  border-black p-2 rounded-lg disabled:bg-gray-500/25 disabled:border-none disabled:text-white disabled:cursor-not-allowed"
              >
                {loading ? <PulseLoader color="#1f1f1f" /> : 'Continue'}
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
