import { AnimatePresence, motion } from 'framer-motion';
import { Info, Warning, XCircle } from 'phosphor-react';
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import Label from '../UI/Label/label.component';
import Select from '../UI/Select/select.component';
import { useDispatch, useSelector } from 'react-redux';
import { getAllModels, selectCarsBrands, selectModelsByBrandDataSource } from '../../store/cars/cars.selector';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useZodForm } from '../../hooks/useZodForm/useZodForm.hook';
import { SearchMinifiedSchema, searchMinifiedSchema } from '../../schema/searchMinified.schema';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../UI/TopLevelNotification/topLevelNotification.component';
import { setModelsByBrand } from '../../store/cars/cars.slice';
import { Input } from '../UI/Input/input.component';
import { sellNowYearsSorted } from '../../config/settings';
import { CountriesTypes, FuelType, countriesDictionary, fuelTypeDictionary } from '../../pages/SellNow/types';
import { buildQuerySearchAd } from '../../utils';
import { ClipLoader } from 'react-spinners';

export type SearchMinifiedHandlers = {
  display: () => void;
  hide: () => void;
};

type SearchMinifiedProps = {
  className?: string;
  hasCloseButton?: boolean;
};

// type BrandModels<TBrand extends string> = {
//     [brand in TBrand]: string[];
// };

// type BrandModels = {
//     [brand: string]: string[];
//   };

// type FetchModelsByBrand<TBrand extends BrandModels> = {
//     status: number,
//     brandModels: TBrand,
//     brand: string;
// }

type FetchModelsByBrand = {
  status: number;
  brandModels: Record<string, string[]>;
  brand: string;
};

type SearchAdRes = {
  results: {
    KM: number;
    bodyType: string;
    color: string;
    colorType: string;
    currency: string;
    fuelType: string;
    images: string;
    noOfDoors: number;
    price: number;
    sellerCity: string;
    sellerFullName: string;
    sellerPhoneNumber: string;
    title: string;
    vehicleOrigin: string;
    year: number;
  }[];
};

const SearchMinified = forwardRef<SearchMinifiedHandlers, SearchMinifiedProps>(
  ({ className, hasCloseButton = false }, ref) => {
    const [showMinifiedSearch, setShowMinifiedSearch] = useState<boolean>(false);
    const searchMinifiedForm = useZodForm({
      schema: searchMinifiedSchema,
    });
    const carsBrands = useSelector(selectCarsBrands).map((value) => ({
      value: value.name,
      label: value.name,
    }));
    const allModels = useSelector(getAllModels());
    const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
    const { sendRequest, error, loading } = useHttpRequest<FetchModelsByBrand>();
    const { sendRequest: searchAdRequest, error: errorSearchAd, loading: loadingSearchAd } = useHttpRequest<SearchAdRes>();
    const dispatch = useDispatch();
    const cachedModels = useSelector(selectModelsByBrandDataSource(searchMinifiedForm.getValues('brand') ?? ''));

    if (error || errorSearchAd) {
      console.error('error ad', error);
      if (topLevelNotificationRef) {
        topLevelNotificationRef.current?.display({
          icon: <Info className="w-14 h-8 text-red-600" />,
          message: `${error?.message ?? errorSearchAd?.message ?? 'Someting went wrong. Please try again later'}`,
        });
      }
    }

    const display = () => {
      setShowMinifiedSearch(true);
    };

    const hide = () => {
      setShowMinifiedSearch(false);
    };

    useImperativeHandle(ref, () => ({
      display,
      hide,
    }));

    const fetchModelsByBrand = useCallback(
      async (model: string) => {
        const contorller = new AbortController();
        return sendRequest(`/api/car/carmodel/${model}`, {
          method: 'GET',
          signal: contorller.signal,
        });
      },
      [searchMinifiedForm.watch('brand')],
    );

    const handleBrandChange = async (brand: string) => {
      if (!allModels[brand]) {
        const respModels = await fetchModelsByBrand(brand);
        if (respModels) {
          const { data, status } = respModels;
          if (status === 200 && data && data?.brandModels && data?.brand) {
            if (data.brandModels[data.brand].length === 0) {
              /* reset selects */
              searchMinifiedForm.setValue('brand', '');
              searchMinifiedForm.setValue('model', '');

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
    };

    const onSubmit: SubmitHandler<SearchMinifiedSchema> = async (data) => {
      const queryURL = buildQuerySearchAd<SearchMinifiedSchema>(data);
      const responseSearchAd = await searchAdRequest(`/api/ad/search?${queryURL}`, {
        method: 'GET',
        withCredentials: true,
      });

      if (responseSearchAd) {
        if (!responseSearchAd?.data?.results?.length) {
          topLevelNotificationRef.current?.display({
            message: 'Search returned no results for the specified filters',
            icon: <Info className="w-14 h-8 text-yellow-400" />,
          });
          return;
        }
      }
    };

    if (!showMinifiedSearch) return null;

    return (
      <>
        <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={hide}
            className={`${className}bg-neutral-900/20 backdrop-blur p-3 lg:p-8 fixed inset-0 z-50 grid place-items-center overflow-y-auto`}
          >
            {hasCloseButton && (
              <XCircle onClick={hide} width={32} height={28} className="absolute top-1 right-1 text-black cursor-pointer" />
            )}
            <motion.form
              onSubmit={searchMinifiedForm.handleSubmit(onSubmit)}
              initial={{ opacity: 0, scale: 0, translateX: '-100%' }}
              animate={{ opacity: 1, scale: 1, translateX: '0%' }}
              exit={{ opacity: 0, scale: 0, translateX: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-black/50 text-white px-3 py-2 rounded-lg md:max-w-xl shadow-xl cursor-default w-full flex  flex-col md:flex-none md:grid md:grid-cols-2 gap-2 md:gap-5"
            >
              <div className="w-full h-fit flex flex-col">
                <Label
                  disabled={loading}
                  className={`my-2 text-sm text-white border-none focus:outline-none active:outline-none bg-transparent px-1`}
                >
                  Brand
                </Label>
                <Controller
                  control={searchMinifiedForm.control}
                  name="brand"
                  render={({ field: { onChange } }) => (
                    <Select
                      onChange={(e: { value: string }) => {
                        onChange(e.value);
                        handleBrandChange(e.value);
                      }}
                      dataSource={carsBrands}
                      classNameWrapper="border-none bg-gray-200 rounded-lg h-full h-[41px]"
                      error={searchMinifiedForm.formState.errors.brand?.message}
                      disabled={loading}
                    />
                  )}
                />
              </div>
              <div className="w-full h-fit flex flex-col">
                <Label
                  disabled={loading}
                  className="my-2 text-sm text-white border-none focus:outline-none active:outline-none bg-transparent px-1"
                >
                  Model
                </Label>
                <Controller
                  control={searchMinifiedForm.control}
                  name="model"
                  render={({ field: { onChange } }) => (
                    <Select
                      onChange={(e: { value: string }) => onChange(e.value)}
                      dataSource={cachedModels}
                      classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                      error={searchMinifiedForm.formState.errors.model?.message}
                      disabled={loading}
                    />
                  )}
                />
              </div>
              <div className="w-full h-fit flex flex-col">
                <Label className="my-2 text-sm text-white border-none focus:outline-none active:outline-none bg-transparent px-1">
                  Price Up To
                </Label>
                <div className="flex items-center bg-gray-200 rounded-lg p-0">
                  <Input
                    {...searchMinifiedForm.register('priceUpTo')}
                    labelClasses="my-2"
                    placeholder="10000 EUR"
                    id="price"
                    type="number"
                    className="border-none bg-transparent text-black flex-1 md:flex-initial"
                    error={searchMinifiedForm.formState.errors.priceUpTo?.message}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="w-full h-fit flex flex-col">
                <Label className="my-2 text-sm text-white border-none focus:outline-none active:outline-none bg-transparent px-1">
                  Year
                </Label>
                <Controller
                  control={searchMinifiedForm.control}
                  name="year"
                  render={({ field: { onChange } }) => (
                    <Select
                      onChange={(e: { value: string }) => {
                        onChange(e.value);
                      }}
                      dataSource={sellNowYearsSorted}
                      classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                      error={searchMinifiedForm.formState.errors.year?.message}
                    />
                  )}
                />
              </div>
              <div className="w-full h-fit flex flex-col">
                <Input
                  {...searchMinifiedForm.register('kmUpTo')}
                  label="Km Up To"
                  labelClasses="my-2"
                  id="km"
                  type="number"
                  className="border-none bg-gray-200 rounded-lg text-black"
                  error={searchMinifiedForm.formState.errors.kmUpTo?.message}
                  disabled={loading}
                />
              </div>
              <div className="w-full h-fit flex flex-col">
                <Label
                  disabled={loading}
                  className="my-2 text-sm text-white border-none focus:outline-none active:outline-none bg-transparent px-1"
                >
                  Fuel
                </Label>
                <Controller
                  control={searchMinifiedForm.control}
                  name="fuel"
                  render={({ field: { onChange } }) => (
                    <Select
                      onChange={(e: { value: FuelType; label: string }) => {
                        onChange({ ...e });
                      }}
                      dataSource={fuelTypeDictionary}
                      disabled={loading}
                      classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                      error={searchMinifiedForm.formState.errors.fuel?.message}
                    />
                  )}
                />
              </div>
              <div className="w-full h-fit flex flex-col">
                <Label
                  disabled={loading}
                  className="my-2 text-sm text-white border-none focus:outline-none active:outline-none bg-transparent px-1"
                >
                  Vehicle origin
                </Label>
                <Controller
                  control={searchMinifiedForm.control}
                  name="vehicleOrigin"
                  render={({ field: { onChange } }) => (
                    <Select
                      onChange={(e: { value: CountriesTypes; label: string }) => {
                        onChange({ ...e });
                      }}
                      dataSource={countriesDictionary}
                      classNameWrapper="border-none bg-gray-200 rounded-lg h-[41px]"
                      error={searchMinifiedForm.formState.errors.vehicleOrigin?.message}
                      disabled={loading}
                    />
                  )}
                />
              </div>
              <button className="my-4 md:mb-0 md:mt-auto w-full p-1 h-10 flex items-center justify-center bg-yellow-400 text-black rounded-md cursor-pointer">
                {!loadingSearchAd ? 'Search' : <ClipLoader color="black" size={25} />}
              </button>
            </motion.form>
          </motion.div>
        </AnimatePresence>
      </>
    );
  },
);

export default SearchMinified;
