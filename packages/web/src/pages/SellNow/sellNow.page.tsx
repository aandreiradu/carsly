import { useCallback, useRef, useState } from 'react';
import { SellNowProps } from '../../types/index.types';
import Modal from '../../components/UI/Modal/modal.component';
import { sellNow__getYears } from '../../config/settings';

import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { useDispatch, useSelector } from 'react-redux';
import { selectCarsBrands, selectModelsByBrandDataSource } from '../../store/cars/cars.selector';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FuelType,
  SellNowStageOneProps,
  SellNowStageTwoProps,
  fuelTypeDictionary,
  sellNowStageOne,
  sellNowStageTwo,
} from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { setModelsByBrand } from '../../store/cars/cars.slice';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../../components/UI/TopLevelNotification/topLevelNotification.component';
import { Info, Warning } from 'phosphor-react';
import StageLevelOne from '../../components/StageLevel/stageLevelOne.component';
import StageLevelTwo from '../../components/StageLevel/stageLevelTwo.component';

const maxStageLevel = +import.meta.env.VITE_MAX_STAGE_LEVEL_SELLNOW;

export type SellNowHandlers = {
  display: () => void;
  hide: () => void;
};

const sellNowYears = sellNow__getYears()
  .map((data) => ({ name: String(data) }))
  .reverse();

const SellNow = ({ setShowComponent, componentName, show }: SellNowProps) => {
  const stageOneForm = useForm<SellNowStageOneProps>({
    resolver: zodResolver(sellNowStageOne),
    mode: 'onSubmit',
    defaultValues: {
      brand: '',
      year: '',
    },
  });
  const stageTwoForm = useForm<SellNowStageTwoProps>({
    resolver: zodResolver(sellNowStageTwo),
    mode: 'onSubmit',
    defaultValues: {
      fuel: FuelType.Petrol,
      model: '',
    },
  });

  console.log('////', stageOneForm.formState.errors);

  const dispatch = useDispatch();
  const { loading, sendRequest, error: fetchModelsByBrandError } = useHttpRequest();
  const [stageLevel, setStageLevel] = useState(1);
  const carsBrands = useSelector(selectCarsBrands);
  const brandModels = useSelector(selectModelsByBrandDataSource(stageOneForm.getValues('brand' ?? null)));
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  console.log('brandModels', brandModels);

  const onSubmitStageOne: SubmitHandler<SellNowStageOneProps> = async () => {
    await changeStageLevel();
  };

  const onSubmitStageTwo: SubmitHandler<SellNowStageTwoProps> = async (data) => {
    const model = stageTwoForm.getValues('model');
    const fuel = stageTwoForm.getValues('fuel');
    if (stageLevel < maxStageLevel && model && fuel) {
      setStageLevel((prev) => prev + 1);
      return;
    }
  };

  const fetchModelsByBrand = useCallback(
    async (model: string) => {
      const contorller = new AbortController();
      return sendRequest(`/api/car/carmodel/${model}`, {
        method: 'GET',
        signal: contorller.signal,
      });
    },
    [stageOneForm.getValues('brand')],
  );

  const changeStageLevel = useCallback(async () => {
    if (stageLevel === maxStageLevel || stageLevel > maxStageLevel) {
      setStageLevel(1);
      return;
    }

    const model = stageOneForm.getValues('brand');
    const year = stageOneForm.getValues('year');
    if (stageLevel < maxStageLevel && model && year) {
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
              stageOneForm.setValue('brand', '');
              stageOneForm.setValue('year', '');
              stageTwoForm.setValue('model', '');
              stageTwoForm.setValue('fuel', FuelType.Petrol);
            }}
            onPrev={() => {
              setStageLevel((prev) => prev - 1);
            }}
            className="relative"
          >
            {stageLevel === 1 && (
              <StageLevelOne
                form={stageOneForm}
                dataSourceOne={sellNowYears}
                labelTextOne="Year*"
                dataSourceTwo={carsBrands}
                labelTextTwo="Brand*"
                onSubmit={stageOneForm.handleSubmit(onSubmitStageOne)}
                isLoading={loading}
              />
            )}
            {stageLevel === 2 && (
              <StageLevelTwo
                form={stageTwoForm}
                dataSourceOne={brandModels}
                labelTextOne="Model*"
                dataSourceTwo={fuelTypeDictionary}
                labelTextTwo="Fuel*"
                onSubmit={stageTwoForm.handleSubmit(onSubmitStageTwo)}
              />
            )}
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
