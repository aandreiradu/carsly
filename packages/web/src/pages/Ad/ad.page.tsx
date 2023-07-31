import { Check, Info, Lightbulb, Warning } from 'phosphor-react';
import Checkbox from '../../components/UI/Checkbox/checkbox.component';
import { AdPageProps } from '../../types/ad.types';
import { Input } from '../../components/UI/Input/input.component';
import TextArea from '../../components/UI/Textarea/textarea.component';
import AdSectionHeader from '../../components/Ad/adSectionHeader.component';
import AdSectionHeaderWithImage from '../../components/Ad/adSectionHeaderWithImage.component';
import { useZodForm } from '../../hooks/useZodForm/useZodForm.hook';
import { AdProps, adSchema } from '../../schema/ad.schema';
import { SubmitHandler } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import Select from '../../components/UI/Select/select.component';
import { noOfSeatsDictionary, sellNowYearsSorted } from '../../config/settings';
import Label from '../../components/UI/Label/label.component';
import { useDispatch, useSelector } from 'react-redux';
import { getAllModels, selectCarsBrands, selectModelsByBrandDataSource } from '../../store/cars/cars.selector';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { CarsBrandsSuccess } from '../../types/index.types';
import { useCallback, useEffect, useRef } from 'react';
import { setCarsBrands, setModelsByBrand } from '../../store/cars/cars.slice';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../../components/UI/TopLevelNotification/topLevelNotification.component';
import {
  CarsColorsTypes,
  ColorTypes,
  CountriesTypes,
  CurrencyTypes,
  FuelType,
  GearboxTypes,
  PolluationNormTypes,
  TransmissionTypes,
  VehicleBodyType,
  bodyTypeDictionary,
  carsColorsDictionary,
  carsColorsTypesDictionary,
  countriesDictionary,
  currencyDictionary,
  fuelTypeDictionary,
  gearboxDictionary,
  polluationNormDictionary,
  transmissionDictionary,
} from '../SellNow/types';
import { noOfDorsDictionary } from '../../config/settings';
import File from '../../components/UI/File/file.component';
import { buildAdPageFormData } from '../../utils';
import Nav from '../../components/Nav/nav.component';

const Ad = ({ title }: AdPageProps) => {
  const topViewRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  const { sendRequest, error, loading } = useHttpRequest<CarsBrandsSuccess>();
  const { sendRequest: createAdRequest, loading: createAdLoading } = useHttpRequest();
  const adPageForm = useZodForm({
    schema: adSchema,
    defaultValues: {
      isImported: false,
    },
  });
  const carsBrands = useSelector(selectCarsBrands).map((value) => ({
    value: value.name,
    label: value.name,
  }));
  const cachedModels = useSelector(selectModelsByBrandDataSource(adPageForm.getValues('brand')));
  const allModels = useSelector(getAllModels());

  const handleIsDamaged = (args: boolean) => {
    adPageForm.setValue('isImported', args);
  };

  useEffect(() => {
    const getCarsBrands = async () => {
      const brandsResponse = await sendRequest('/api/car/brands', {
        method: 'GET',
        withCredentials: true,
      });

      if (brandsResponse) {
        const { status, data } = brandsResponse;

        if (status === 200 && data?.carsBrands) {
          dispatch(setCarsBrands({ carsBrands: data.carsBrands }));
        }
      }
    };

    //cached
    carsBrands?.length === 0 && getCarsBrands();
  }, []);

  if (error) {
    console.error('error ad', error);
    if (topLevelNotificationRef) {
      topLevelNotificationRef.current?.display({
        icon: <Info className="w-14 h-8 text-red-600" />,
        message: `${error.message ?? 'Someting went wrong. Please try again later'}`,
      });
    }
  }

  const handleBrandChange = useCallback(
    async (brand: string) => {
      if (!allModels[brand]) {
        const respModels = await fetchModelsByBrand(brand);
        if (respModels) {
          const { data, status } = respModels;
          if (status === 200 && data && data?.brandModels && data?.brand) {
            if (data.brandModels[data.brand].length === 0) {
              /* reset selects */
              adPageForm.setValue('brand', '');
              adPageForm.setValue('model', '');

              if (topLevelNotificationRef) {
                topLevelNotificationRef.current?.display({
                  icon: <Info className="w-14 h-8 text-yellow-400" />,
                  message: `No models were defined for ${brand}. \n Please select another brand`,
                });
              }

              /* dispatch even if no models were defined => will be used later for caching */
              dispatch(setModelsByBrand({ brand: data.brand, models: data.brandModels[data.brand] }));
            }
            dispatch(setModelsByBrand({ brand: data.brand, models: data.brandModels[data.brand] }));
          } else {
            if (topLevelNotificationRef) {
              topLevelNotificationRef.current?.display({
                icon: <Warning className="w-14 h-8 text-red-500" />,
                message: 'Something went wrong when fetching your brand models. Please try again later',
              });
            }
          }
        }
      } else if (allModels[brand]?.length === 0) {
        if (topLevelNotificationRef) {
          topLevelNotificationRef.current?.display({
            icon: <Info className="w-14 h-8 text-yellow-400" />,
            message: `No models were defined for ${brand}. \n Please select another brand`,
          });
        }
      }
    },
    [adPageForm.getValues('brand')],
  );

  console.log(adPageForm.formState.errors);

  const onSubmit: SubmitHandler<AdProps> = async (data) => {
    const formData = buildAdPageFormData<AdProps>(data);
    console.log('babaababa', formData);
    for (let i = 0; i < data.images?.length; i++) {
      formData.append(`image-${i + 1}`, data.images[i]);
    }
    formData.delete('images');
    const responseAd = await createAdRequest('/api/ad', {
      method: 'POST',
      withCredentials: true,
      data: formData,
    });

    if (responseAd) {
      const {
        status,
        data: { message },
      } = responseAd;
      if (status === 400) {
        if (Array.isArray(message) && message?.length > 0) {
          for (let i = 0; i < message.length; i++) {
            adPageForm.setError(message[i]?.field, {
              message: message[i].error.split(',')[0],
            });

            if (topLevelNotificationRef) {
              topLevelNotificationRef.current?.display({
                icon: <Warning className="w-14 h-8 text-red-600" />,
                message: "Looks like some fields didn't passed our validation. Please review the ad.",
              });
            }
          }
          setTimeout(() => {
            topViewRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else if (typeof message === 'string') {
          if (topLevelNotificationRef) {
            topLevelNotificationRef.current?.display({
              icon: <Warning className="w-14 h-8 text-red-600" />,
              message: message,
            });
          }
        }
      } else if (status === 201) {
        if (topLevelNotificationRef) {
          topLevelNotificationRef.current?.display({
            icon: <Check className="w-14 h-8 text-green-500" />,
            message: `Ad created successfully`,
          });
        }
        adPageForm.reset();
      } else {
        if (topLevelNotificationRef) {
          topLevelNotificationRef.current?.display({
            icon: <Warning className="w-14 h-8 text-red-600" />,
            message: message || 'Something went wrong. Try again later',
          });
        }
      }
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
    [adPageForm.watch('brand')],
  );

  return (
    <>
      <div ref={topViewRef}></div>
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
      <Nav setShowComponent={() => {}} />
      <form
        encType="multipart/form-data"
        ref={formRef}
        id="adForm"
        onSubmit={adPageForm.handleSubmit(onSubmit)}
        className="w-full min-h-screen bg-white px-5 py-3 md:px-16 md:py-7 xl:px-64 xl:py-14 font-kanit text-black "
      >
        <h1 className=" text-xl font-bold py-4 tracking-wide lg:text-3xl lg:py-1 lg:tracking-wider">{title}</h1>
        <AdSectionHeaderWithImage title="Vehicle details" labelText="OPTIONAL" className="lg:mb-1" />
        <div className="flex flex-col">
          <div className="flex gap-5">
            <Controller
              name="isDamaged"
              control={adPageForm.control}
              render={({ field: { onChange } }) => (
                <Checkbox
                  label="Damaged"
                  id="damaged"
                  className="text-black focus:ring-black h-6"
                  wrapperClassNames="flex items-center basis-3/6 px-3 py-1 border border-gray-200 mt-6"
                  labelClassNames="text-lg"
                  onChange={onChange}
                />
              )}
            />

            <div className="flex basis-3/6 ">
              <div className="flex flex-col w-full">
                <label htmlFor="imported p-1">Imported</label>
                <div className="flex items-center justify-between w-full">
                  <button
                    type="button"
                    onClick={() => handleIsDamaged(false)}
                    className={`relative flex justify-center items-center w-full bg-gray-200 m-0 px-3 py-2 text-black font-bold cursor-pointer leading-6 hover:bg-indigo-600 focus:bg-indigo-600 group ${
                      !adPageForm.watch('isImported') && 'bg-indigo-600 text-white'
                    }`}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => handleIsDamaged(true)}
                    className={`relative flex justify-center items-center w-full bg-gray-200 m-0 px-3 py-2 text-black font-bold cursor-pointer leading-6 hover:bg-indigo-600 focus:bg-indigo-600 ${
                      adPageForm.watch('isImported') && 'bg-indigo-600 text-white'
                    }`}
                  >
                    Yes
                  </button>
                </div>
                {adPageForm.formState.errors.isImported && (
                  <span className="text-red-500 text-sm ">
                    {adPageForm.formState.errors.isImported.message ?? 'Please complete this field'}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex lg:w-[49%] mt-6">
            <Controller
              control={adPageForm.control}
              name="isRightHandDrive"
              render={({ field: { onChange } }) => (
                <Checkbox
                  label="Right hand drive"
                  id="rightHandDrive"
                  className="text-black focus:ring-black h-6"
                  wrapperClassNames="w-full px-3 py-1 border border-gray-200"
                  labelClassNames="text-lg"
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>
        <AdSectionHeader title="General Informations" />
        <div className="flex space-x-4 w-full">
          <Lightbulb className="w-10 h-10 lg:h-6 lg:w-6" />
          <span className="text-base font-light">
            Enter the VIN code (chassis series) and we will automatically fill in the information for you whenever possible.
          </span>
        </div>
        <div className="flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-5 mt-5">
          <div className="flex flex-col w-full lg:flex-1">
            <Controller
              control={adPageForm.control}
              name="VIN"
              render={() => (
                <Input
                  label="VIN (chassis series)*"
                  labelClasses="my-2"
                  id="vin"
                  type="text"
                  placeholder="ex: 1FTPW14V88FC22108"
                  maxLength={13}
                  className="border-none bg-gray-200 rounded-lg"
                  error={adPageForm.formState.errors.VIN?.message}
                  onChange={(e) => {
                    if (e?.target.value) {
                      e.target.value = e?.target.value.toUpperCase();
                      adPageForm.setValue('VIN', e.target.value.toUpperCase());
                    }
                  }}
                />
              )}
            />
          </div>
          <div className="flex flex-col w-full lg:flex-1">
            <Input
              {...adPageForm.register('KM')}
              label="KM*"
              labelClasses="my-2"
              id="km"
              type="number"
              placeholder="ex: 100 000"
              className="border-none bg-gray-200 rounded-lg"
              error={adPageForm.formState.errors.KM?.message}
              step="any"
            />
          </div>
        </div>
        <div
          className={`${
            adPageForm?.watch('VIN')?.length === 13 && adPageForm?.watch('KM') && adPageForm?.watch('KM') >= 1
              ? 'flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-5 mt-5'
              : 'hidden'
          }`}
        >
          <div className="flex flex-col w-full lg:flex-1">
            <label className="my-2">Date of first registration*</label>
            <div className={`flex gap-2 items-start`}>
              <div className="flex flex-col">
                <Input
                  {...adPageForm.register('dayOfRegistration')}
                  id="zzDOR"
                  type="number"
                  placeholder="DD"
                  min={1}
                  max={31}
                  className="border-none bg-gray-200 rounded-lg w-28 lg:w-16"
                  error={adPageForm.formState.errors.dayOfRegistration?.message}
                />
              </div>

              <div className="flex flex-col">
                <Input
                  {...adPageForm.register('monthOfRegistration')}
                  id="mmDOR"
                  min={1}
                  max={12}
                  type="number"
                  placeholder="MM"
                  className="border-none bg-gray-200 rounded-lg w-28 lg:w-16"
                  error={adPageForm.formState.errors.monthOfRegistration?.message}
                />
              </div>
              <div className="flex flex-col">
                <Input
                  {...adPageForm.register('yearOfRegistration')}
                  id="yyyyDOR"
                  type="number"
                  placeholder="YYYY"
                  min={1900}
                  className="border-none bg-gray-200 rounded-lg w-28 lg:w-16"
                  error={adPageForm.formState.errors.yearOfRegistration?.message}
                />
              </div>
            </div>
          </div>
        </div>
        {adPageForm.watch('dayOfRegistration') >= 1 &&
          adPageForm.watch('dayOfRegistration') <= 31 &&
          adPageForm.watch('monthOfRegistration') >= 1 &&
          adPageForm.watch('monthOfRegistration') <= 12 &&
          adPageForm.watch('yearOfRegistration') >= 1900 && <AdSectionHeader title="Technical details" />}

        {adPageForm.watch('dayOfRegistration') >= 1 &&
          adPageForm.watch('dayOfRegistration') <= 31 &&
          adPageForm.watch('monthOfRegistration') >= 1 &&
          adPageForm.watch('monthOfRegistration') <= 12 &&
          adPageForm.watch('yearOfRegistration') >= 1900 && (
            <p className="text-sm lg:text-base font-light">
              Please check the details of the vehicle before publishing the ad. You can change mistakes regarding VIN, make,
              model, year <b>only during the first 24 hours from the moment of adding the ad.</b>
            </p>
          )}
        <div
          className={`${
            adPageForm.watch('dayOfRegistration') >= 1 &&
            adPageForm.watch('dayOfRegistration') <= 31 &&
            adPageForm.watch('monthOfRegistration') >= 1 &&
            adPageForm.watch('monthOfRegistration') <= 12 &&
            adPageForm.watch('yearOfRegistration') >= 1900
              ? 'flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-5 mt-5'
              : 'hidden'
          }`}
        >
          <div className="flex flex-col w-full lg:flex-1 ease-in">
            <Label className="my-2 text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1">
              Year*
            </Label>
            <Controller
              control={adPageForm.control}
              name="year"
              render={({ field: { onChange } }) => (
                <Select
                  onChange={(e: { value: string }) => onChange(e.value)}
                  dataSource={sellNowYearsSorted}
                  classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                  error={adPageForm.formState.errors.year?.message}
                />
              )}
            />
          </div>
          <div className="flex flex-col w-full lg:flex-1">
            <Label
              disabled={loading || !adPageForm.watch('year')}
              className={`my-2 text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1`}
            >
              Brand*
            </Label>
            <Controller
              control={adPageForm.control}
              name="brand"
              render={({ field: { onChange } }) => (
                <Select
                  onChange={(e: { name: string }) => {
                    onChange(e.name);
                    handleBrandChange(e.name);
                  }}
                  dataSource={carsBrands}
                  classNameWrapper="border-none bg-gray-200 rounded-lg h-full h-[41px]"
                  error={adPageForm.formState.errors.brand?.message}
                  disabled={loading || !adPageForm.watch('year')}
                />
              )}
            />
          </div>
          <div className="flex flex-col w-full lg:flex-1">
            <Label
              disabled={loading || (!adPageForm.watch('brand') && cachedModels.length === 0)}
              className="my-2 text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1"
            >
              Model*
            </Label>
            <Controller
              control={adPageForm.control}
              name="model"
              render={({ field: { onChange } }) => (
                <Select
                  onChange={(e: { name: string }) => onChange(e.name)}
                  dataSource={cachedModels}
                  classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                  error={adPageForm.formState.errors.model?.message}
                  disabled={allModels[adPageForm.watch('brand')]?.length === 0 || !adPageForm.watch('brand') || loading}
                />
              )}
            />
          </div>
          <div className="flex flex-col w-full lg:flex-1">
            <Label
              disabled={loading || !adPageForm.watch('model')}
              className="my-2 text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1"
            >
              Fuel*
            </Label>
            <Controller
              control={adPageForm.control}
              name="fuel"
              render={({ field: { onChange } }) => (
                <Select
                  onChange={(e: { value: FuelType; label: string }) => {
                    // adPageForm.setValue('fuel', { ...e });
                    onChange({ ...e });
                  }}
                  dataSource={fuelTypeDictionary}
                  disabled={!adPageForm.watch('model') || allModels[adPageForm.watch('brand')]?.length === 0 || loading}
                  classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                  error={adPageForm.formState.errors.fuel?.message}
                />
              )}
            />
          </div>
          <div className="flex flex-col w-full lg:flex-1">
            <Input
              {...adPageForm.register('engineSize')}
              label="Engine size*"
              labelClasses="my-2"
              id="engineSize"
              type="text"
              placeholder="Ex: 1 395 cm3"
              className="border-none bg-gray-200 rounded-lg"
              error={adPageForm.formState.errors.engineSize?.message}
              disabled={!adPageForm.watch('fuel')}
            />
          </div>
          <div className="flex flex-col w-full lg:flex-1">
            <Input
              {...adPageForm.register('power')}
              label="Power*"
              labelClasses="my-2"
              id="power"
              type="number"
              min={1}
              placeholder="Ex: 150"
              className="border-none bg-gray-200 rounded-lg"
              error={adPageForm.formState.errors.power?.message}
              disabled={!adPageForm.watch('engineSize')}
            />
          </div>

          <div className="flex flex-col w-full lg:flex-1">
            <Label
              disabled={loading || !adPageForm.watch('engineSize')}
              className="my-2 text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1"
            >
              No of doors*
            </Label>
            <Controller
              control={adPageForm.control}
              name="noOfDoors"
              render={({ field: { onChange } }) => (
                <Select
                  onChange={(e: { value: number }) => {
                    // adPageForm.setValue('noOfDoors', +e.value);
                    onChange({ ...e });
                  }}
                  dataSource={noOfDorsDictionary}
                  classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                  error={adPageForm.formState.errors.noOfDoors?.message}
                  disabled={loading || !adPageForm.watch('engineSize')}
                />
              )}
            />
          </div>
          <div className="flex flex-col w-full lg:flex-1">
            <Label
              disabled={loading || !adPageForm.watch('noOfDoors')}
              className="my-2 text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1"
            >
              Gearbox*
            </Label>
            <Controller
              control={adPageForm.control}
              name="gearbox"
              render={({ field: { onChange } }) => (
                <Select
                  onChange={(e: { value: GearboxTypes; label: string }) => {
                    adPageForm.setValue('gearbox', { ...e });
                    onChange({ ...e });
                  }}
                  dataSource={gearboxDictionary}
                  classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                  error={adPageForm.formState.errors.gearbox?.message}
                  disabled={loading || !adPageForm.watch('noOfDoors')}
                />
              )}
            />
          </div>
          <div className="flex flex-col w-full lg:flex-1">
            <Label
              disabled={loading || !adPageForm.watch('gearbox')}
              className="my-2 text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1"
            >
              Transmission*
            </Label>
            <Controller
              control={adPageForm.control}
              name="transmission"
              render={({ field: { onChange } }) => (
                <Select
                  onChange={(e: { value: TransmissionTypes; label: string }) => {
                    onChange({ ...e });
                  }}
                  dataSource={transmissionDictionary}
                  classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                  error={adPageForm.formState.errors.transmission?.message}
                  disabled={loading || !adPageForm.watch('gearbox')}
                />
              )}
            />
          </div>
          <div className="flex flex-col w-full lg:flex-1">
            <Label
              disabled={loading || !adPageForm.watch('transmission')}
              className="my-2 text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1"
            >
              Polluation Norm*
            </Label>
            <Controller
              control={adPageForm.control}
              name="polluationNorm"
              render={({ field: { onChange } }) => (
                <Select
                  onChange={(e: { value: PolluationNormTypes; label: string }) => {
                    onChange({ ...e });
                  }}
                  dataSource={polluationNormDictionary}
                  classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                  error={adPageForm.formState.errors.polluationNorm?.message}
                  disabled={loading || !adPageForm.watch('transmission')}
                />
              )}
            />
          </div>
          <div className="flex flex-col w-full lg:flex-1">
            <Input
              {...adPageForm.register('co2emissions')}
              label="CO2 Emissions"
              labelClasses="my-2"
              id="co2emissions"
              type="number"
              placeholder="g/km"
              className="border-none bg-gray-200 rounded-lg"
              error={adPageForm.formState.errors.co2emissions?.message}
              disabled={loading || !adPageForm.watch('polluationNorm')}
              required={false}
            />
          </div>
        </div>
        {adPageForm.watch('polluationNorm') && <AdSectionHeader title="Body type details" />}
        <div className="flex flex-col gap-5 w-full lg:grid lg:grid-cols-2">
          <div
            className={`
            ${adPageForm.watch('polluationNorm') ? 'flex flex-col w-full lg:flex-1 lg:col-span-1' : 'hidden'}
          `}
          >
            <Label className="my-2 text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1">
              Body Type*
            </Label>
            <Controller
              control={adPageForm.control}
              name="bodyType"
              render={({ field: { onChange } }) => (
                <Select
                  onChange={(e: { value: VehicleBodyType; label: string }) => {
                    console.log('e este', e);
                    onChange({ ...e });
                  }}
                  dataSource={bodyTypeDictionary}
                  classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                  error={adPageForm.formState.errors.bodyType?.message}
                  disabled={loading || !adPageForm.watch('polluationNorm')}
                />
              )}
            />
          </div>
          <div
            className={`
            ${adPageForm.watch('bodyType') ? 'flex flex-col w-full lg:flex-1' : 'hidden'}
          `}
          >
            <Label className="my-2 text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1">
              Color*
            </Label>
            <Controller
              control={adPageForm.control}
              name="color"
              render={({ field: { onChange } }) => (
                <Select
                  onChange={(e: { value: CarsColorsTypes; label: string }) => {
                    // adPageForm.setValue('color', { ...e });
                    onChange({ ...e });
                  }}
                  dataSource={carsColorsDictionary}
                  classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                  error={adPageForm.formState.errors.color?.message}
                  disabled={loading || !adPageForm.watch('bodyType')}
                />
              )}
            />
          </div>
          <div
            className={`
            ${adPageForm.watch('color') ? 'flex flex-col w-full lg:flex-1' : 'hidden'}
          `}
          >
            <Label className="my-2 text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1">
              Color Type*
            </Label>
            <Controller
              control={adPageForm.control}
              name="colorType"
              render={({ field: { onChange } }) => (
                <Select
                  onChange={(e: { value: ColorTypes; label: string }) => {
                    // adPageForm.setValue('colorType', { ...e });
                    onChange({ ...e });
                  }}
                  dataSource={carsColorsTypesDictionary}
                  classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                  error={adPageForm.formState.errors.colorType?.message}
                  disabled={loading || !adPageForm.watch('color')}
                />
              )}
            />
          </div>
          <div className="flex flex-col w-full lg:flex-1">
            <Label
              disabled={loading || !adPageForm.watch('colorType')}
              className="my-2 text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1"
            >
              Seats*
            </Label>
            <Controller
              control={adPageForm.control}
              name="seats"
              render={({ field: { onChange } }) => (
                <Select
                  onChange={(e: { value: number }) => {
                    // adPageForm.setValue('seats', e.value);
                    onChange({ ...e });
                  }}
                  dataSource={noOfSeatsDictionary}
                  classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                  error={adPageForm.formState.errors.seats?.message}
                  disabled={loading || !adPageForm.watch('colorType')}
                />
              )}
            />
          </div>
        </div>
        {adPageForm.watch('seats') && (
          <Controller
            name={'images'}
            control={adPageForm.control}
            render={() => (
              <File
                maxAcceptedFiles={5}
                wrapperClasses="bg-gray-200 mt-2 p-4 lg:min-h-[200px] rounded-lg text-white"
                buttonClasses="text-white bg-indigo-500 rounded-lg"
                withCountHeader={true}
                withDragDrop={false}
                onChange={(option) => {
                  if (option) {
                    console.log('optionnn', option);
                    adPageForm.setValue('images', option);
                  }
                }}
              />
            )}
          />
        )}
        {adPageForm.watch('seats') && (
          <div className="flex space-x-4 w-full my-5">
            <Lightbulb className="w-10 h-10 lg:h-6 lg:w-6" />
            <span className="text-base font-light">
              Increase the attractiveness of the ad by adding a YouTube link with a recording of the vehicle
            </span>
          </div>
        )}
        <div className={`${adPageForm.watch('seats') ? 'flex flex-col w-full lg:flex-1' : 'hidden'}`}>
          <Input
            {...adPageForm.register('youtubeVideo')}
            label="Video Youtube "
            labelClasses="my-2"
            id="youtubeVideo"
            type="text"
            placeholder="Ex: https://www.youtube.com/watch?v=2g83-3j7nww&t=51s"
            className="border-none bg-gray-200 rounded-lg"
            error={adPageForm.formState.errors.youtubeVideo?.message}
            required={false}
          />
        </div>
        {adPageForm.watch('seats') && <AdSectionHeaderWithImage title="Vehicle description" />}
        <div className={`${adPageForm.watch('seats') ? 'flex flex-col w-full lg:flex-1' : 'hidden'}`}>
          <Input
            {...adPageForm.register('adTitle')}
            label="Title*"
            labelClasses="my-2"
            id="adTitle"
            type="text"
            maxLength={30}
            placeholder="Ex: 2018 Mercedes-Benz E53 AMG"
            className="border-none bg-gray-200 rounded-lg"
            error={adPageForm.formState.errors.adTitle?.message}
          />
        </div>
        <div className={`${adPageForm.watch('seats') ? 'flex flex-col w-full lg:flex-1 my-8' : 'hidden'}`}>
          <Controller
            name={'description'}
            control={adPageForm.control}
            render={() => (
              <TextArea
                name="description"
                maxLen={250}
                minLen={1}
                label="Description"
                className="bg-gray-200 rounded-md"
                onChange={(option) => {
                  if (option) {
                    adPageForm.setValue('description', option?.target?.value);
                  }
                }}
              />
            )}
          />
        </div>
        {adPageForm.watch('seats') && <AdSectionHeaderWithImage title="Vehicle historic" />}
        {adPageForm.watch('seats') && <p className="text-base lg:text-xl font-light">Origin of the vehicle</p>}
        <div className="flex flex-col gap-5 w-full lg:grid lg:grid-cols-2">
          <div className={`${adPageForm.watch('seats') ? 'flex flex-col w-full lg:flex-1' : 'hidden'}`}>
            <Label
              disabled={loading || !adPageForm.watch('seats')}
              className="my-2 text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1"
            >
              Vehicle origin*
            </Label>
            <Controller
              control={adPageForm.control}
              name="vehicleOrigin"
              render={({ field: { onChange } }) => (
                <Select
                  onChange={(e: { value: CountriesTypes; label: string }) => {
                    // adPageForm.setValue('vehicleOrigin', { ...e });
                    console.log('origineee', e);
                    onChange({ ...e });
                  }}
                  dataSource={countriesDictionary}
                  classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                  error={adPageForm.formState.errors.vehicleOrigin?.message}
                  disabled={loading || !adPageForm.watch('seats')}
                />
              )}
            />
          </div>
        </div>
        {adPageForm.watch('seats') && <AdSectionHeaderWithImage title="Vehicle Status" labelText="OPTIONAL" />}
        {adPageForm.watch('seats') && (
          <div className="flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-5">
            <Controller
              control={adPageForm.control}
              name="isFirstOwner"
              render={({ field: { onChange } }) => (
                <Checkbox
                  {...adPageForm.register('isFirstOwner')}
                  label="First owner"
                  id="firstOnwer"
                  className="text-black focus:ring-black h-6"
                  wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-6"
                  labelClassNames="text-lg"
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={adPageForm.control}
              name="isWithoutAccident"
              render={({ field: { onChange } }) => (
                <Checkbox
                  label="Without accident"
                  id="withoutAccident"
                  className="text-black focus:ring-black h-6"
                  wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-6"
                  labelClassNames="text-lg"
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={adPageForm.control}
              name="isRegistered"
              render={({ field: { onChange } }) => (
                <Checkbox
                  label="Registered"
                  id="isVehicleRegistered"
                  className="text-black focus:ring-black h-6"
                  wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-3"
                  labelClassNames="text-lg"
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={adPageForm.control}
              name="isServiceCardAvailable"
              render={({ field: { onChange } }) => (
                <Checkbox
                  label="Service card"
                  id="serviceCard"
                  className="text-black focus:ring-black h-6"
                  wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-3"
                  labelClassNames="text-lg"
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={adPageForm.control}
              name="isVintageCar"
              render={({ field: { onChange } }) => (
                <Checkbox
                  label="Vintage car"
                  id="vintagecAR"
                  className="text-black focus:ring-black h-6"
                  wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-3"
                  labelClassNames="text-lg"
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={adPageForm.control}
              name="hasTuning"
              render={({ field: { onChange } }) => (
                <Checkbox
                  label="Tuning"
                  id="tuning"
                  className="text-black focus:ring-black h-6"
                  wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-3"
                  labelClassNames="text-lg"
                  onChange={onChange}
                />
              )}
            />
          </div>
        )}
        {adPageForm.watch('vehicleOrigin') && <AdSectionHeader title="Price" />}
        <div
          className={`
          ${adPageForm.watch('vehicleOrigin') ? 'flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-5 mt-5' : 'hidden'}
          `}
        >
          <div className="flex flex-col w-full lg:flex-1">
            <Input
              {...adPageForm.register('price')}
              label="Price*"
              labelClasses="my-2"
              id="price"
              type="number"
              placeholder="Ex: 8000 EUR"
              className="border-none bg-gray-200 rounded-lg"
              error={adPageForm.formState.errors.price?.message}
              disabled={loading || !adPageForm.watch('vehicleOrigin')}
            />
          </div>
          <div className="flex flex-col w-full lg:flex-1">
            <Label
              disabled={loading || !adPageForm.watch('price')}
              className="my-2 text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1"
            >
              Currency*
            </Label>
            <Controller
              control={adPageForm.control}
              name="currency"
              render={({ field: { onChange } }) => (
                <Select
                  onChange={(e: { value: CurrencyTypes; label: string }) => {
                    // adPageForm.setValue('currency', { ...e });
                    onChange({ ...e });
                  }}
                  dataSource={currencyDictionary}
                  classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                  error={adPageForm.formState.errors.currency?.message}
                  disabled={loading || !adPageForm.watch('price')}
                />
              )}
            />
          </div>
        </div>
        {adPageForm.watch('price') && <AdSectionHeader title="Price details" />}
        {adPageForm.watch('price') && (
          <div className="flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-5">
            <Controller
              control={adPageForm.control}
              name="isNegotiable"
              render={({ field: { onChange } }) => (
                <Checkbox
                  label="Negotiable"
                  id="priceNegotiable"
                  className="text-black focus:ring-black h-6"
                  wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-3"
                  labelClassNames="text-lg"
                  onChange={onChange}
                  error={adPageForm.formState.errors.isNegotiable?.message}
                />
              )}
            />

            <Controller
              control={adPageForm.control}
              name="isLeasing"
              render={({ field: { onChange } }) => (
                <Checkbox
                  label="Leasing"
                  id="leasing"
                  className="text-black focus:ring-black h-6"
                  wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-3"
                  labelClassNames="text-lg"
                  onChange={onChange}
                  error={adPageForm.formState.errors.isLeasing?.message}
                />
              )}
            />
          </div>
        )}
        {adPageForm.watch('price') && <AdSectionHeader title="Seller details" />}
        {adPageForm.watch('price') && (
          <div className="flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-5 mt-2">
            <div className="flex flex-col w-full lg:flex-1">
              <Input
                {...adPageForm.register('sellerFullName')}
                label="Name*"
                labelClasses="my-2"
                id="sellerFullName"
                type="text"
                className="border-none bg-gray-200 rounded-lg"
                error={adPageForm.formState.errors.sellerFullName?.message}
                disabled={loading || !adPageForm.watch('currency')}
              />
            </div>
            <div className="flex flex-col w-full lg:flex-1">
              <Input
                {...adPageForm.register('sellerCity')}
                label="City*"
                labelClasses="my-2"
                id="sellerCity"
                type="text"
                className="border-none bg-gray-200 rounded-lg"
                error={adPageForm.formState.errors.sellerCity?.message}
                disabled={loading || !adPageForm.watch('sellerFullName')}
              />
            </div>
            <div className="flex flex-col w-full lg:flex-1">
              <Input
                {...adPageForm.register('sellerPhoneNumber')}
                label="Phone number*"
                labelClasses="my-2"
                id="sellerPhoneNo"
                type="text"
                className="border-none bg-gray-200 rounded-lg"
                error={adPageForm.formState.errors.sellerPhoneNumber?.message}
                disabled={loading || !adPageForm.watch('sellerCity')}
              />
            </div>
          </div>
        )}
        <button
          form="adForm"
          type="submit"
          disabled={!adPageForm.watch('sellerPhoneNumber') && !Boolean(adPageForm.watch('sellerPhoneNumber')?.length < 10)}
          className={`
            flex opacity-100 bg-indigo-500 hover:bg-indigo-800 shadow-md hover:transition-colors text-white items-center justify-center my-5 py-2 px-3 lg:w-48 mx-auto text-xl rounded-lg lg:my-10 lg:py-3 lg:px-5
            ${
              !adPageForm.watch('sellerPhoneNumber') &&
              !Boolean(adPageForm.watch('sellerPhoneNumber')?.length < 10) &&
              'opacity-50 bg-gray-500 cursor-not-allowed'
            }
            `}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Ad;
