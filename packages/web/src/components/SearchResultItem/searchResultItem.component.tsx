import { TrendUp, GasPump, Calendar, Heart, Warning } from 'phosphor-react';
import BackupImage from '../../assets/missing-image.jpg';
import { AdCarDetailsProps } from '../../store/search/search.slice';
import useAddToFavorite from '../../hooks/useAddToFavorite/useAddToFavorite.hook';
import { useSelector } from 'react-redux';
import { selectIsFavoriteAd } from '../../store/favorites/favorites.selector';
import { ClipLoader } from 'react-spinners';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../UI/TopLevelNotification/topLevelNotification.component';
import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResultItem = (props: AdCarDetailsProps) => {
  const navigate = useNavigate();
  const { errorFavorites, handleAddToFavorite, loadingFavorites } = useAddToFavorite({ isOfferOfTheDay: false });
  const isFavAd = useSelector(selectIsFavoriteAd(props?.id ?? ''));
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);

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

  const handleNavigateToAd = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    navigate(`/ad/${props.id}`);
  }, []);

  return (
    <>
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
      <div
        onClick={handleNavigateToAd}
        className="w-full flex flex-col md:flex-row h-[350px] md:h-[240px] shadow-2xl border border-black rounded-md overflow-hidden cursor-pointer"
      >
        <img
          src={props.thumbnail ? `${import.meta.env.VITE_BACKEND_URL}/${props.thumbnail}` : BackupImage}
          className="w-full md:w-[40%] bg-cover h-[200px] md:h-full"
        />
        <div className="flex flex-col pl-4 pr-2 py-2 w-full md:w-[60%]">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <p className="text-xl leading-6 font-bold font-kanit">{props.title}</p>
              <span className="hidden md:block text-xs text-gray-500 overflow-hidden">
                {props.engineSize} cm3 &#8226; {props.power} &#8226; {props.description}
              </span>
            </div>
            <p className="ml-auto text-2xl font-bold h-fit">
              {props.price}
              <span className="font-extralight text-base ml-1">{props.currency}</span>
            </p>
          </div>
          <div className="flex flex-col">
            <div className="mt-1 flex justify-start space-x-3">
              <div className="flex items-center space-x-1">
                <TrendUp height="40px" />
                <span className="text-black font-medium">{props.KM} KM</span>
              </div>
              <div className="flex items-center space-x-1">
                <GasPump height="40px" />
                <span className="text-black font-medium">{props.fuelType}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar height="40px" />
                <span className="text-black font-medium">{props.year}</span>
              </div>
            </div>
          </div>
          <div className="mt-auto flex justify-between">
            <div className="flex flex-col">
              <span className="text-base font-semibold font-kanit">{props.sellerCity}</span>
              <span className="text-base font-semibold font-kanit">{props.sellerFullName}</span>
            </div>
            {!loadingFavorites ? (
              <>
                {isFavAd ? (
                  <Heart
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAddToFavorite({
                        adId: props?.id ?? '',
                        currency: props?.currency ?? null,
                        name: props?.title ?? null,
                        price: props?.price ?? 0,
                        thumbnail: props?.thumbnail ?? '',
                        location: props?.location ?? '',
                      });
                    }}
                    cursor="pointer"
                    weight="fill"
                    color="red"
                    className="h-10 w-8"
                  />
                ) : (
                  <Heart
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAddToFavorite({
                        adId: props?.id ?? '',
                        currency: props?.currency ?? null,
                        name: props?.title ?? null,
                        price: props?.price ?? 0,
                        thumbnail: props?.thumbnail ?? '',
                        location: props?.location ?? '',
                      });
                    }}
                    cursor="pointer"
                    color="#1f1f1f"
                    className="h-10 w-8"
                  />
                )}
              </>
            ) : (
              <ClipLoader color="black" size={25} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResultItem;
