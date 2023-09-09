import { useSelector, useDispatch } from 'react-redux';
import { selectFavoriteAds } from '../../store/favorites/favorites.selector';
import Nav from '../../components/Nav/nav.component';
import FavoriteCardItem from '../../components/FavoriteCard/favoriteCard.component';
import { useEffect, useRef } from 'react';
import { FavoriteCarAd, setFavoriteAds, setFavoritesCount } from '../../store/favorites/favorites.slice';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../../components/UI/TopLevelNotification/topLevelNotification.component';
import { Warning } from 'phosphor-react';
import { Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/Layouts/Main/main.layout';
import Sidebar from '../../components/Sidebar/sidebar.component';

interface LoadingContentProps {
  count?: number;
}

const LoadingContent = ({ count = 1 }: LoadingContentProps) => {
  const fakeMap = count > 0 ? Array(count).fill({ fake: true }) : [];

  return (
    <>
      {fakeMap?.map((_, idx) => (
        <div key={`__skeleton_wrapper_${idx}`} className="w-full md:max-w-[258px] h-[258px] flex flex-col">
          <Skeleton variant="rectangular" width="100%" height={192} />
          <Skeleton className="mt-2" variant="text" />
          <Skeleton className="mt-2" variant="text" />
          <Skeleton className="mt-2" variant="text" />
        </div>
      ))}
    </>
  );
};

const FavoritePage = () => {
  const dispatch = useDispatch();
  const favoriteAds = useSelector(selectFavoriteAds);
  const {
    sendRequest: SRGetFavoritesAds,
    error: errorFavoritesAds,
    loading: loadingFavoriteAds,
  } = useHttpRequest<{ count: number; favorites: FavoriteCarAd[] }>();
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);

  useEffect(() => {
    const getFavoritesAdsByUser = async () => {
      const favoriteAds = await SRGetFavoritesAds('/api/ad/favorites', {
        method: 'GET',
        withCredentials: true,
      });

      if (favoriteAds && favoriteAds.status === 200) {
        const { count, favorites } = favoriteAds.data || {};
        if (count && +count > 0) {
          dispatch(setFavoritesCount(count));
        }

        if (favorites && favorites?.length) {
          dispatch(setFavoriteAds(favorites));
        }
      }
    };

    !favoriteAds?.length && getFavoritesAdsByUser();
  }, []);

  if (errorFavoritesAds) {
    if (errorFavoritesAds instanceof Error) {
      if (topLevelNotificationRef) {
        topLevelNotificationRef.current?.display({
          icon: <Warning className="w-14 h-8 text-red-600" />,
          message: errorFavoritesAds?.message || 'Something went wrong. Please try again later!',
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
    <MainLayout className="bg-white">
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
      <Nav setShowComponent={() => {}} />
      <Sidebar setShowComponent={() => {}} />
      <section className="h-full my-6 max-h-[98%] mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {!favoriteAds.length ? (
          <EmptyFavoriteAds />
        ) : (
          <ul className="grid grid-cols-1 gap-4 xl:grid-cols-4cols-258 lg:grid-cols-3cols-258 md:grid-cols-2cols-258">
            {loadingFavoriteAds ? (
              <LoadingContent count={8} />
            ) : (
              favoriteAds.map((favItem) => (
                <FavoriteCardItem
                  key={`${favItem.adId}`}
                  name={favItem.name}
                  adId={favItem.adId}
                  currency={favItem.currency}
                  price={favItem.price}
                  thumbnail={favItem.thumbnail}
                  location={favItem.location}
                />
              ))
            )}
          </ul>
        )}
      </section>
    </MainLayout>
  );
};

const EmptyFavoriteAds = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <p className="text-lg text-ellipsis leading-6">
        No favorites ads found. Let's add some{' '}
        <Link className="font-bold italic text-blue-400" to={'/'}>
          here
        </Link>
      </p>
    </div>
  );
};

export default FavoritePage;
