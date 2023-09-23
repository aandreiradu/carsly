import { useSelector } from 'react-redux';
import { selectFavoriteAds } from '../../store/favorites/favorites.selector';
import Nav from '../../components/Nav/nav.component';
import FavoriteCardItem from '../../components/FavoriteCard/favoriteCard.component';
import { useEffect, useRef } from 'react';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../../components/UI/TopLevelNotification/topLevelNotification.component';
import { Warning } from 'phosphor-react';
import { Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/Layouts/Main/main.layout';
import Sidebar from '../../components/Sidebar/sidebar.component';
import useGetFavoriteAds from '../../hooks/useGetFavoriteAds/useGetFavoriteAds.hook';

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
  const favoriteAds = useSelector(selectFavoriteAds);
  const { errorFavoritesAds, getFavoritesAdsByUser, loadingFavoriteAds } = useGetFavoriteAds();
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);

  useEffect(() => {
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
      <section className="h-full my-2 md:my-6 md:mx-auto px-2 overflow-y-auto">
        {!favoriteAds.length ? (
          <EmptyFavoriteAds />
        ) : (
          <ul className="grid grid-cols-1 gap-4 xl:grid-cols-4cols-258 lg:grid-cols-3cols-258 md:grid-cols-2cols-258 mb-10">
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
