import { Heart, Warning } from 'phosphor-react';
import { type LatestAd } from '../../store/ad/ad.slice';
import BackUpAdImage from '../../assets/missing-image.jpg';
import { useSelector } from 'react-redux';
import { isFavorite } from '../../store/favorites/favorites.selector';
import useAddToFavorite from '../../hooks/useAddToFavorite/useAddToFavorite.hook';
import { ClipLoader } from 'react-spinners';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../UI/TopLevelNotification/topLevelNotification.component';
import { useRef } from 'react';

interface ILatestAd extends LatestAd {}

const LatestAd = ({ adId, currency, name, price, thumbnail, location }: ILatestAd) => {
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  const isFavoriteAd = useSelector(isFavorite(adId));
  const { errorFavorites, handleAddToFavorite, loadingFavorites } = useAddToFavorite();

  if (errorFavorites) {
    if (topLevelNotificationRef) {
      topLevelNotificationRef.current?.display({
        icon: <Warning className="w-14 h-8 text-red-600" />,
        message: errorFavorites?.message || 'Something went wrong. Please try again later!',
      });
    }
  }

  return (
    <>
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
      <div key={adId} className="flex flex-col flex-shrink-0 relative w-52 h-64 bg-[#2f2e2e] text-white rounded-lg">
        <button
          disabled={loadingFavorites}
          className={`absolute cursor-pointer top-2 right-2 p-1 bg-[#2f2e2e] rounded-lg ${loadingFavorites && 'pb-0'}`}
          onClick={handleAddToFavorite.bind(this, {
            adId: adId ?? '',
            currency: currency ?? null,
            name: name ?? null,
            price: price ?? 0,
            thumbnail: thumbnail ?? '',
            location: location ?? '',
          })}
        >
          {loadingFavorites ? (
            <ClipLoader color="white" size={23} />
          ) : isFavoriteAd > -1 ? (
            <Heart weight="fill" color="red" className="h-6 w-6" />
          ) : (
            <Heart className="h-6 w-6" />
          )}
        </button>

        <img
          className="select-none pointer-events-none rounded-lg h-full w-full bg-cover bg-center max-h-[70%] rounded-bl-none rounded-br-none"
          src={thumbnail ? `${import.meta.env.VITE_BACKEND_URL}/${thumbnail}` : BackUpAdImage}
        />

        <div className="px-2 py-1 select-none h-full max-h-[30%]">
          <p className="text-sm">{name}</p>
          <div className="flex justify-between items-center h-full">
            <span className="text-base capitalize h-5 overflow-hidden text-ellipsis">{location}</span>
            <span className="text-xl font-kanit font-semibold flex items-center flex-col-reverse pb-2">
              {price || 0} <small className="text-sm mr-1">{currency || 'N/A'}</small>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestAd;

169208;
