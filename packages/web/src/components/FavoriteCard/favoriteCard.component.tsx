import { useRef } from 'react';
import { Heart, Warning } from 'phosphor-react';
import { FavoriteCarAd } from '../../store/favorites/favorites.slice';
import { ClipLoader } from 'react-spinners';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../UI/TopLevelNotification/topLevelNotification.component';
import BackupImage from '../../assets/missing-image.jpg';
import useAddToFavorite from '../../hooks/useAddToFavorite/useAddToFavorite.hook';
import { Link } from 'react-router-dom';

const FavoriteCardItem = ({ adId, currency, name, price, thumbnail, location, disableFavorite = false }: FavoriteCarAd) => {
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  const { errorFavorites, handleAddToFavorite, loadingFavorites } = useAddToFavorite({ isOfferOfTheDay: false });

  if (errorFavorites) {
    if (errorFavorites instanceof Error) {
      if (topLevelNotificationRef) {
        topLevelNotificationRef.current?.display({
          icon: <Warning className="w-14 h-8 text-red-600" />,
          message: errorFavorites?.message || 'Something went wrong. Please try again later!',
        });
      }
    } else {
      if (topLevelNotificationRef) {
        topLevelNotificationRef.current?.display({
          icon: <Warning className="w-14 h-8 text-red-600" />,
          message: 'Something went wrong. Please try again later!',
        });
      }
    }
  }

  return (
    <>
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
      <div className="max-h-[350px] w-full border shadow-xl rounded-md cursor-pointer">
        <div className="h-48 w-full">
          <Link className="w-full h-full" to={`/ad/${adId}`}>
            <img
              className="w-full h-full object-cover rounded-tl-md rounded-tr-md"
              src={thumbnail ? `${import.meta.env.VITE_BACKEND_URL}/${thumbnail}` : BackupImage}
              alt={name ?? 'ad thumbnail'}
            />
          </Link>
        </div>
        <div className="flex flex-col p-4 gap-2">
          <div className="flex items-start justify-between gap-4">
            <p className="text-base h-10 overflow-hidden text-ellipsis leading-5">{name}</p>
            {!disableFavorite && (
              <button
                disabled={loadingFavorites}
                className="flex w-fit items-center p-0 bg-none disabled:bg-gray-500  disabled:pointer-events-none"
                onClick={handleAddToFavorite.bind(this, {
                  adId,
                  currency,
                  name,
                  price,
                  thumbnail,
                  location,
                })}
              >
                {!loadingFavorites ? (
                  <Heart weight="fill" color="red" className="h-6 w-6" />
                ) : (
                  <ClipLoader color="#1f1f1f" size={25} />
                )}
              </button>
            )}
          </div>
          <p className="text-sm leading-4 h-9 text-ellipsis overflow-hidden">{location ?? 'Unknown'}</p>
          <p className="leading-4 text-lg text-red-500">
            {price} {currency}
          </p>
        </div>
      </div>
    </>
  );
};

export default FavoriteCardItem;
