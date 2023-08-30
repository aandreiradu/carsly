import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home.page';
import SignUp from './pages/SignUp/signup.page';
import SignIn from './pages/SignIn/signin.page';
import Persist from './components/Persist/persist.component';
import Ad from './pages/Ad/ad.page';
import NotFound from './pages/NotFound/notfound.page';
import FavoritePage from './pages/Favorites/favorites.page';
import AdDetailsPage from './pages/AdDetails/adDetails.page';
import { useEffect, useRef } from 'react';
import useHttpRequest from './hooks/useHttpRequest/useHttp.hook';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavoriteAds } from './store/favorites/favorites.selector';
import { IGetFavoriteAds } from './types/ad.types';
import { setFavoriteAds, setFavoritesCount } from './store/favorites/favorites.slice';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from './components/UI/TopLevelNotification/topLevelNotification.component';
import { Warning } from 'phosphor-react';

function App() {
  const favoriteAds = useSelector(selectFavoriteAds);
  const dispatch = useDispatch();
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  const { sendRequest: SRGetFavoritesAds, error: errorFavoritesAds } = useHttpRequest<IGetFavoriteAds>();
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

    favoriteAds?.length === 0 && getFavoritesAdsByUser();
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
    <>
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route element={<Persist />}>
          <Route index path="/" element={<Home />} />
          <Route path="/auto/add" element={<Ad title="Sell Your Car Now" />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/ad/:adId" element={<AdDetailsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
