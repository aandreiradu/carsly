import MainLayout from '../../components/Layouts/Main/main.layout';
import { Warning } from 'phosphor-react';
import Nav from '../../components/Nav/nav.component';
import _axios from '../../api/axios/axios';
import { useEffect, useRef, useState } from 'react';
import { ShowComponentProps } from '../../types/index.types';
import Sidebar from '../../components/Sidebar/sidebar.component';
import { useSelector } from 'react-redux';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../../components/UI/TopLevelNotification/topLevelNotification.component';
import { selectCarsBrands } from '../../store/cars/cars.selector';
import OfferOfTheDay from '../../components/OfferOfTheDay/offerOfTheDay.component';
import { selectFavoriteAds } from '../../store/favorites/favorites.selector';
import LatestAdsPage from '../LatestAds/latestAds.page';
import MainDashboard from '../../components/MainDashboard/mainDashboard.component';
import useGetFavoriteAds from '../../hooks/useGetFavoriteAds/useGetFavoriteAds.hook';
import useGetCarsBrands from '../../hooks/useGetCarsBrands/useGetCarsBrands.hook';

const Home = () => {
  const carsBrands = useSelector(selectCarsBrands);
  const favoriteAds = useSelector(selectFavoriteAds);
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  const { errorGetCarsBrands, getCarsBrands } = useGetCarsBrands();
  const { errorFavoritesAds, getFavoritesAdsByUser } = useGetFavoriteAds();
  const [_, setShowComponent] = useState<ShowComponentProps>({ show: false, componentName: '' });

  useEffect(() => {
    //cached
    carsBrands?.length === 0 && getCarsBrands();
    favoriteAds?.length === 0 && getFavoritesAdsByUser();
  }, []);

  if (errorGetCarsBrands) {
    if (topLevelNotificationRef) {
      topLevelNotificationRef.current?.display({
        message: errorGetCarsBrands.message,
        icon: <Warning className="w-14 h-8 text-red-500" />,
      });
    }
  } else if (errorFavoritesAds) {
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
    <MainLayout>
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
      <Nav setShowComponent={setShowComponent} />
      <Sidebar setShowComponent={setShowComponent} />
      <section className="md:ml-2 px-2 gap-4 md:px-0 my-6 md:my-0 h-full max-h-[98%] flex flex-wrap items-center w-full overflow-auto xl:space-x-5 2xl:space-x-7">
        <div className="flex w-full shadow-xl bg-default-gray rounded-2xl h-full max-h-[735px] md:max-h-[800px] md:my-auto py-3 px-2 m-0 lg:m-5 lg:py-2 lg:px-6 md:max-w-[600px] xl:max-w-[60%]">
          <MainDashboard>
            <LatestAdsPage />
          </MainDashboard>
        </div>
        <OfferOfTheDay />
      </section>
    </MainLayout>
  );
};

export default Home;
