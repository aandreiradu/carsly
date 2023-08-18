import Carousel from '../../components/Carousel/carousel.component';
import MainLayout from '../../components/Layouts/Main/main.layout';
import { Heart, Star, Warning } from 'phosphor-react';
import Nav from '../../components/Nav/nav.component';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import _axios from '../../api/axios/axios';
import { useEffect, useRef, useState } from 'react';
import { CarsBrandsSuccess, ShowComponentProps } from '../../types/index.types';
import Sidebar from '../../components/Sidebar/sidebar.component';
import { useDispatch, useSelector } from 'react-redux';
import { setCarsBrands } from '../../store/cars/cars.slice';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../../components/UI/TopLevelNotification/topLevelNotification.component';
import { selectCarsBrands } from '../../store/cars/cars.selector';
import OfferOfTheDay from '../../components/OfferOfTheDay/offerOfTheDay.component';
import { setFavoriteAds, setFavoritesCount } from '../../store/favorites/favorites.slice';

const categories = ['All Cars', 'Electric', 'Gasoline', 'Hybrids', 'Oldest', 'Newest'];

const Home = () => {
  const carsBrands = useSelector(selectCarsBrands);
  console.log('carsBrands din home', carsBrands);
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  const dispatch = useDispatch();
  const { sendRequest, error } = useHttpRequest();
  const { sendRequest: SRGetFavoritesAds, error: errorFavoritesAds, data: dataFavoriteAds } = useHttpRequest();
  const [_, setShowComponent] = useState<ShowComponentProps>({ show: false, componentName: '' });

  useEffect(() => {
    const getCarsBrands = async () => {
      const brandsResponse = await sendRequest('/api/car/brands', {
        method: 'GET',
        withCredentials: true,
      });

      if (brandsResponse) {
        const { status, data } = brandsResponse;

        if (status === 200 && data?.carsBrands) {
          dispatch(setCarsBrands({ carsBrands: data.carsBrands }));
        }
      }
    };

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

    //cached
    carsBrands?.length === 0 && getCarsBrands();
    getFavoritesAdsByUser();
  }, []);

  if (error) {
    if (topLevelNotificationRef) {
      topLevelNotificationRef.current?.display({
        message: error.message,
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
        {/* LEFT */}
        <div className="flex w-full shadow-xl bg-default-gray rounded-2xl h-full max-h-[735px] md:max-h-[800px] md:my-auto py-3 px-2 m-0 lg:m-5 lg:py-5 lg:px-6 md:max-w-[600px] xl:max-w-[1000px]">
          <div className="w-full h-full flex flex-col overflow-hidden">
            <h1 className="text-white mb-4 font-kanit text-xl md:text-4xl font-bold tracking-widest">
              Find your perfect car
            </h1>
            <Carousel className="flex text-center items-center w-full space-x-4 overflow-hidden overflow-x-auto">
              {categories.map((cat, index) => (
                <div
                  key={'a' + index}
                  className="select-none cursor-pointer flex flex-shrink-0 justify-center items-center w-24 h-12 md:w-36  font-kanit text-base md:text-lg bg-yellow-400 py-2 rounded-xl"
                >
                  {cat}
                </div>
              ))}
            </Carousel>

            <div className=" relative p-4 mt-10 h-72 w-full md:h-full md:max-h-80 rounded-lg flex items-start justify-center flex-col">
              <img
                className="z-0 absolute top-0 left-0 w-full h-full object-cover object-bottom rounded-lg brightness-75"
                src={'./landing-1.jpg'}
              />

              <div className="z-10 text-white">
                <h2 className="font-kanit text-3xl">Top Safety Pick</h2>
                <p className="pt-3 font-kanit text-base capitalize">
                  Awarded the most 2021 <br /> <span className="text-sm uppercase">IIHS TOP SAFETY PICK</span>
                </p>
              </div>
            </div>

            <Carousel className="cursor-grab mt-10 px-1 md:pl-1 md:pr-4 flex items-center space-x-3 overflow-x-auto overflow-y-hidden">
              {categories.map((_, index) => (
                <div
                  key={'b' + index}
                  className="flex flex-col flex-shrink-0 relative w-52 h-64 bg-[#2f2e2e] text-white rounded-lg"
                >
                  <span className="absolute cursor-pointer top-2 left-2 p-1 bg-[#2f2e2e] rounded-lg">
                    <Heart className="h-5 w-6" />
                  </span>

                  <img
                    className="select-none pointer-events-none rounded-lg h-full w-full bg-cover bg-center max-h-[70%]"
                    src={'./landing-2.jpg'}
                  />

                  <div className="px-2 py-1 select-none ">
                    <p className="text-sm">Mercedes Benz AMG GTR PRO +</p>
                    <div className="flex justify-between items-center">
                      <span className="text-base capitalize">petrol</span>
                      <div className="flex items-center">
                        <Star />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <OfferOfTheDay />
      </section>
    </MainLayout>
  );
};

export default Home;
