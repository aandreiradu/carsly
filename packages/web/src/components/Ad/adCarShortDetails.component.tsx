import { Skeleton } from '@mui/material';
import AdSellerDetails from './adSellerDetails.component';
import { Heart, Warning } from 'phosphor-react';
import { useSelector } from 'react-redux';
import { selectIsFavoriteAd } from '../../store/favorites/favorites.selector';
import useAddToFavorite from '../../hooks/useAddToFavorite/useAddToFavorite.hook';
import { ClipLoader } from 'react-spinners';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../UI/TopLevelNotification/topLevelNotification.component';
import { useRef } from 'react';
import type { AdCarDetailsProps } from '../../store/search/search.slice';

const AdCarShortDetails = ({
  id,
  title,
  year,
  fuelType,
  bodyType,
  KM,
  currency,
  price,
  isNegotiable,
  sellerCity,
  sellerFullName,
  sellerPhoneNumber,
  isLoading = false,
  thumbnail,
  location = 'Romania',
}: AdCarDetailsProps) => {
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  const isFavAd = useSelector(selectIsFavoriteAd(id ?? ''));
  const { errorFavorites, handleAddToFavorite, loadingFavorites } = useAddToFavorite({ isOfferOfTheDay: false });

  if (isLoading) {
    return (
      <div className="w-full md:w-[25%] h-[100px] md:h-[300px] my-1 md:my-0 px-2">
        <Skeleton
          sx={{ bgcolor: 'grey.400', marginTop: '10px' }}
          variant="text"
          animation="wave"
          width="50%"
          height="30px"
        />
        <Skeleton sx={{ bgcolor: 'grey.400' }} variant="text" animation="wave" width="50%" height="30px" />
        <Skeleton sx={{ bgcolor: 'grey.400' }} variant="text" animation="wave" width="35%" height="30px" />
        <div className="hidden md:block w-full h-[70px] mt-2">
          <Skeleton sx={{ bgcolor: 'grey.400' }} variant="rectangular" animation="wave" width="100%" height="100%" />
        </div>
      </div>
    );
  }

  if (errorFavorites) {
    if (topLevelNotificationRef) {
      topLevelNotificationRef.current?.display({
        icon: <Warning className="w-14 h-8 text-red-600" />,
        message: errorFavorites?.message || 'Could not add this to favorites. Please try again later!',
      });
    }
  }

  return (
    <>
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
      <div className="w-full md:w-[25%] h-full   flex-1 flex-col  md:sticky md:top-0 md:right-0">
        <button
          disabled={isLoading || loadingFavorites}
          className={`${
            isLoading || loadingFavorites ? 'w-12' : 'w-28'
          } md:my-2 ml-auto transition-width duration-300 flex items-center justify-center gap-1 first-letter:cursor-pointer py-2 px-2 bg-[#1f1f1f] text-white text-xl font-kanit active:outline-none focus:outline-none disabled:pointer-events-none`}
          onClick={handleAddToFavorite.bind(this, {
            adId: id ?? '',
            currency: currency ?? null,
            name: title ?? null,
            price: price ?? 0,
            thumbnail: thumbnail ?? '',
            location: location ?? '',
          })}
        >
          {!loadingFavorites ? (
            <>
              {isFavAd ? (
                <>
                  <span className="text-base">Remove</span>
                  <Heart weight="fill" color="red" className="h-6 w-6" />
                </>
              ) : (
                <>
                  <span className="text-base">Add</span>
                  <Heart color="white" className="h-6 w-6" />
                </>
              )}
            </>
          ) : (
            <ClipLoader color="white" size={25} />
          )}
        </button>
        <p className="text-lg font-bold px-2">{title}</p>
        <p className="text-base font-semibold capitalize px-2">
          {year} &#8226; {KM} &#8226; {fuelType} &#8226; {bodyType}
        </p>
        <p className="mt-3 font-bold text-2xl text-red-500 px-2">
          {price} <span className="text-base">{currency}</span>
        </p>
        {isNegotiable && <span className="text-base text-[#f9fdff] capitalize">{isNegotiable}</span>}
        <AdSellerDetails
          sellerCity={sellerCity ?? ''}
          sellerName={sellerFullName ?? ''}
          sellerPhoneNumber={sellerPhoneNumber ?? ''}
        />
      </div>
    </>
  );
};

export default AdCarShortDetails;
