import { Heart, Warning } from 'phosphor-react';
import { CurrencyTypes, FuelType } from '../../pages/SellNow/types';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { FavoriteCarAd, addOrRemoveAdToFavorites } from '../../store/favorites/favorites.slice';
import { isFavoriteAd } from '../../store/favorites/favorites.selector';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { type OfferOfTheDay, setOfferOfTheDay } from '../../store/ad/ad.slice';
import { selectOfferOfTheDay } from '../../store/ad/ad.selector';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../UI/TopLevelNotification/topLevelNotification.component';
import { ClipLoader } from 'react-spinners';
import Skeleton from 'react-loading-skeleton';

interface OfferOfTheDayProps {
  imageURL: string;
  title: string;
  fuel: FuelType;
  price: number;
  currency: CurrencyTypes;
  year: number;
  km: number;
  engineSize: number;
  description?: string;
  details?: {
    text: string;
    value: string | number;
  }[];
}

const OfferOfTheDay = ({
  currency,
  description,
  engineSize,
  fuel,
  imageURL,
  km,
  price,
  title,
  year,
}: OfferOfTheDayProps) => {
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  const { loading, sendRequest, error } = useHttpRequest();
  const dispatch = useDispatch();
  const offerOfTheDay = useSelector(selectOfferOfTheDay);

  const yelloDefault = 'rgb(253 224 71)';

  const handleAddToFavorite = useCallback((ad: FavoriteCarAd) => {
    if (loading) return;
    dispatch(addOrRemoveAdToFavorites(ad));
  }, []);

  useEffect(() => {
    const getOfferOfTheDay = async () => {
      const responseOffer = await sendRequest('/api/ad/offerOfTheDay', {
        withCredentials: true,
        method: 'GET',
      });

      if (responseOffer) {
        const { data, status } = responseOffer;
        const offerOfTheDay = data as OfferOfTheDay;
        if (status === 200 && offerOfTheDay?.adId) {
          dispatch(setOfferOfTheDay(data));
        } else {
          if (topLevelNotificationRef) {
            topLevelNotificationRef.current?.display({
              icon: <Warning className="w-14 h-8 text-red-600" />,
              message: 'Offer of the day not available. Please try again later!',
            });
          }
        }
      }
    };

    // !offerOfTheDay && getOfferOfTheDay();
    getOfferOfTheDay();
  }, []);

  if (error) {
    if (error instanceof Error) {
      if (topLevelNotificationRef) {
        topLevelNotificationRef.current?.display({
          icon: <Warning className="w-14 h-8 text-red-600" />,
          message: error?.message || 'Offer of the day not available. Please try again later!',
        });
      }
    } else {
      if (topLevelNotificationRef) {
        topLevelNotificationRef.current?.display({
          icon: <Warning className="w-14 h-8 text-red-600" />,
          message: 'Offer of the day not available. Please try again later!',
        });
      }
    }
  }

  return (
    <>
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
      <div className="relative my-6 md:my-0 shadow-xl bg-default-gray w-full h-fit md:h-full md:max-h-[800px] md:max-w-md flex flex-col rounded-2xl">
        <p className="absolute z-10 -top-4  left-1/2 -translate-x-1/2 text-black font-bold capitalize bg-yellow-400 p-2 rounded-lg">
          Offer of the day
        </p>
        {loading ? (
          <ClipLoader color={yelloDefault} size={25} />
        ) : (
          <img
            className="z-0 w-full h-fit md:h-full md:max-h-[40%] object-cover object-bottom rounded-lg brightness-75"
            src={imageURL}
          />
        )}
        <div className="relative h-full mt-4 px-4 flex flex-col text-white overflow-auto">
          <h2 className="font-kanit text-2xl font-bold tracking-wider">
            {loading ? <ClipLoader color={yelloDefault} size={25} /> : offerOfTheDay?.title ?? 'N/A'}
          </h2>
          <ul className="flex items-center my-3 space-x-4 overflow-x-auto overflow-y-hidden">
            <li className="bg-[#2f2e2e] w-24 flex items-center justify-center text-center flex-col p-3 rounded-lg">
              <span className="text-sm">KM</span>
              <span className="text-base font-bold">{offerOfTheDay?.km ?? 'N/A'}</span>
            </li>
            <li className="bg-[#2f2e2e] w-24 flex items-center justify-center text-center flex-col p-3 rounded-lg">
              <span className="text-sm">Fuel</span>
              <span className="text-base font-bold">{offerOfTheDay?.fuel ?? 'N/A'}</span>
            </li>
            <li className="bg-[#2f2e2e] w-24 flex items-center justify-center text-center flex-col p-3 rounded-lg">
              <span className="text-sm">Year</span>
              <span className="text-base font-bold">{offerOfTheDay?.year ?? 'N/A'}</span>
            </li>
            <li className="bg-[#2f2e2e] w-24 flex items-center justify-center text-center flex-col p-3 rounded-lg">
              <span className="text-sm">Engine</span>
              <span className="text-base font-bold">
                {offerOfTheDay?.engineSize ? `${offerOfTheDay.engineSize}cm3` : 'N/A'}
              </span>
            </li>
          </ul>

          <p className="my-2 text-base leading-loose h-full max-h-48 overflow-auto">{offerOfTheDay?.description}</p>

          <div className="mt-auto w-full py-4 px-1 bg-default-gray flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-kanit text-lg font-light">Price</span>
              {loading ? (
                <ClipLoader color={yelloDefault} size={25} />
              ) : (
                <span className="text-2xl font-kanit font-bold">
                  <small className="text-sm mr-1">{currency}</small>
                  {price}
                </span>
              )}
            </div>
            <button
              disabled={loading}
              className="flex items-center justify-center gap-1 first-letter:cursor-pointer bg-yellow-400 py-2 px-3 rounded-3xl text-xl text-black font-kanit active:outline-none focus:outline-none transition-colors duration-300 disabled:bg-gray-500 disabled:pointer-events-none"
              onClick={handleAddToFavorite.bind(this, {
                adId: offerOfTheDay?.adId ?? '',
                currency: offerOfTheDay?.currency ?? null,
                name: offerOfTheDay?.title ?? null,
                price: offerOfTheDay?.price ?? 0,
                thumbnail: offerOfTheDay?.imageURL ?? '',
                location: 'unknown',
              })}
            >
              {loading ? (
                <ClipLoader color={yelloDefault} size={25} />
              ) : (
                <>
                  Add to favorite
                  <Heart color="#1f1f1f" className="h-6 w-6 " />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferOfTheDay;
