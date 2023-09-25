import { useCallback, useEffect, useRef, useState } from 'react';
import MainLayout from '../../components/Layouts/Main/main.layout';
import Nav from '../../components/Nav/nav.component';
import Sidebar from '../../components/Sidebar/sidebar.component';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../../components/UI/TopLevelNotification/topLevelNotification.component';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { Warning } from 'phosphor-react';
import { Skeleton } from '@mui/material';
import FavoriteCardItem from '../../components/FavoriteCard/favoriteCard.component';
import { useLocation } from 'react-router-dom';
import { LoadingContentProps, UserAd } from '../../types/ad.types';

const EmptyAds = () => {
  return (
    <div className="w-full grid place-items-center bg-blue-400">
      <p className="text-lg text-ellipsis leading-6 font-kanit font-semibold">No ads found</p>
    </div>
  );
};

const LoadingContent = ({ count = 1 }: LoadingContentProps) => {
  const fakeMap = count > 0 ? Array(count).fill({ fake: true }) : [];

  return (
    <div className="flex items-center gap-4 flex-shrink-0 flex-wrap">
      {fakeMap?.map((_, idx) => (
        <div key={`__skeleton_wrapper_${idx}`} className="w-full md:max-w-[258px] h-[258px] flex flex-col">
          <Skeleton variant="rectangular" width="100%" height={192} />
          <Skeleton className="mt-2" variant="text" />
          <Skeleton className="mt-2" variant="text" />
          <Skeleton className="mt-2" variant="text" />
        </div>
      ))}
    </div>
  );
};

const UserAdsPage = () => {
  const { state } = useLocation();
  const [userAdsData, setUserAdsData] = useState<UserAd[]>([]);
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  const { sendRequest, loading, error } = useHttpRequest<{ ads: UserAd[] }>();

  const getAllUserAds = useCallback(async () => {
    const userAds = await sendRequest('/api/user/ads', {
      method: 'GET',
      withCredentials: true,
    });

    if (userAds && userAds?.data?.ads) {
      setUserAdsData(userAds?.data.ads);
    }
  }, []);

  useEffect(() => {
    getAllUserAds();
  }, []);

  if (error) {
    if (topLevelNotificationRef) {
      topLevelNotificationRef.current?.display({
        icon: <Warning className="w-14 h-8 text-red-600" />,
        message: error?.message || 'Something went wrong. Please try again later!',
      });
    }
  }

  return (
    <MainLayout className="bg-white">
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
      <Nav setShowComponent={() => {}} />
      <Sidebar setShowComponent={() => {}} />
      <section className="my-2 md:my-6 md:mx-auto px-2 md:px-6 lg:px-12 overflow-y-auto w-full">
        {state?.sellerName && (
          <h3 className="mb-4 font-kanit text-lg font-semibold text-right capitalize">{state?.sellerName} ads</h3>
        )}
        {loading ? (
          <LoadingContent count={8} />
        ) : !userAdsData?.length ? (
          <EmptyAds />
        ) : (
          <ul className="grid grid-cols-1 gap-4 xl:grid-cols-4cols-258 lg:grid-cols-3cols-258 md:grid-cols-2cols-258 mb-10">
            {userAdsData.map(({ id, title, currency, price, thumbnail, sellerCity }) => (
              <FavoriteCardItem
                key={id}
                name={title}
                adId={id}
                currency={currency}
                price={price}
                thumbnail={thumbnail}
                location={sellerCity}
                disableFavorite={true}
              />
            ))}
          </ul>
        )}
      </section>
    </MainLayout>
  );
};

export default UserAdsPage;
