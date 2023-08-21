import { useEffect, useRef } from 'react';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { useDispatch, useSelector } from 'react-redux';
import { setLatestAds } from '../../store/ad/ad.slice';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../../components/UI/TopLevelNotification/topLevelNotification.component';
import { Warning } from 'phosphor-react';
import { selectLatestAds } from '../../store/ad/ad.selector';
import LatestAd from '../../components/LatestAd/latestAd.component';
import Carousel from '../../components/Carousel/carousel.component';
import SkeletonWrapper from '../../components/UI/Skeleton/skeletonWrapper.component';

const LatestAdsPage = () => {
  const dispatch = useDispatch();
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  const { sendRequest, loading, error } = useHttpRequest();
  const latestAds = useSelector(selectLatestAds);

  if (error) {
    if (topLevelNotificationRef) {
      topLevelNotificationRef.current?.display({
        message: error.message || 'Could not fetch the latest offers. Please try again later',
        icon: <Warning className="w-14 h-8 text-red-500" />,
      });
    }
  }

  useEffect(() => {
    const getLatestAds = async () => {
      const latestAdsRes = await sendRequest('/api/ad/latest', {
        method: 'GET',
        withCredentials: true,
      });
      if (latestAdsRes?.status === 200) {
        dispatch(setLatestAds(latestAdsRes.data));
      }
    };

    !latestAds && getLatestAds();
  }, []);

  return (
    <>
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
      <h3 className="mt-2 mb-1 text-white text-xl md:text-2xl leading-5  font-kanit">Latest Ads</h3>
      {!loading ? (
        <Carousel className="cursor-grab mt-2 px-1 md:pl-1 md:pr-4 flex items-center space-x-3 overflow-x-auto overflow-y-hidden">
          {latestAds?.map((ad) => (
            <LatestAd key={ad.adId} {...ad} />
          ))}
        </Carousel>
      ) : (
        <div className="w-full flex items-center cursor-grab mt-2 px-1 md:pl-1 md:pr-4 space-x-3 overflow-x-auto overflow-y-hidden">
          <SkeletonWrapper count={9} />
        </div>
      )}
    </>
  );
};

export default LatestAdsPage;
