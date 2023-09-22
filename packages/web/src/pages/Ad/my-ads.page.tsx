import { useSelector, useDispatch } from 'react-redux';
import Nav from '../../components/Nav/nav.component';
import FavoriteCardItem from '../../components/FavoriteCard/favoriteCard.component';
import { useEffect, useRef } from 'react';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../../components/UI/TopLevelNotification/topLevelNotification.component';
import { Warning } from 'phosphor-react';
import { Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/Layouts/Main/main.layout';
import Sidebar from '../../components/Sidebar/sidebar.component';
import { type MyAd, setMyAds } from '../../store/ad/ad.slice';
import { selectMyAds } from '../../store/ad/ad.selector';

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

const MyAdsPage = () => {
  const dispatch = useDispatch();
  const myAds = useSelector(selectMyAds);
  const {
    sendRequest: SRGetMyAds,
    error: errorMyAds,
    loading: loadingMyAds,
  } = useHttpRequest<{ count: number; userAds: MyAd[] }>();
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);

  useEffect(() => {
    const getFavoritesAdsByUser = async () => {
      const myAdsRes = await SRGetMyAds('/api/ad/me', {
        method: 'GET',
        withCredentials: true,
      });

      if (myAdsRes && myAdsRes.status === 200) {
        const { count, userAds } = myAdsRes.data || {};
        if (userAds && userAds?.length) {
          dispatch(
            setMyAds({
              myAds: userAds,
              myAdsCount: count ?? userAds?.length ?? 0,
            }),
          );
        }
      }
    };

    !myAds?.length && getFavoritesAdsByUser();
  }, []);

  if (errorMyAds) {
    if (errorMyAds instanceof Error) {
      if (topLevelNotificationRef) {
        topLevelNotificationRef.current?.display({
          icon: <Warning className="w-14 h-8 text-red-600" />,
          message: errorMyAds?.message || 'Something went wrong. Please try again later!',
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
      <section className="h-full my-6 max-h-[98%] md:mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {!myAds.length ? (
          <EmptyAds />
        ) : (
          <ul className="grid grid-cols-1 gap-4 xl:grid-cols-4cols-258 lg:grid-cols-3cols-258 md:grid-cols-2cols-258">
            {loadingMyAds ? (
              <LoadingContent count={4} />
            ) : (
              myAds.map((myAd) => (
                <FavoriteCardItem
                  key={`${myAd.adId}`}
                  name={myAd.name}
                  adId={myAd.adId}
                  currency={myAd.currency}
                  price={myAd.price}
                  thumbnail={myAd.thumbnail}
                  location={myAd.location}
                />
              ))
            )}
          </ul>
        )}
      </section>
    </MainLayout>
  );
};

const EmptyAds = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <p className="text-lg text-ellipsis leading-6">
        No ads found. Let's add one{' '}
        <Link className="font-bold italic text-blue-400" to={'/auto/add'}>
          here
        </Link>
      </p>
    </div>
  );
};

export default MyAdsPage;
