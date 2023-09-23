import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home.page';
import SignUp from './pages/SignUp/signup.page';
import SignIn from './pages/SignIn/signin.page';
import Persist from './components/Persist/persist.component';
import Ad from './pages/Ad/ad.page';
import NotFound from './pages/NotFound/notfound.page';
import FavoritePage from './pages/Favorites/favorites.page';
import AdDetailsPage from './pages/AdDetails/adDetails.page';
import { useRef } from 'react';

import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from './components/UI/TopLevelNotification/topLevelNotification.component';
import SearchResultsPage from './pages/SearchResults/searchResults.page';
import ForgotPasswordPage from './pages/ForgotPassword/forgot-password.page';
import ForgotPasswordRequestTokenPage from './pages/ForgotPassword/forgot-password-request-token.page';
import MyAdsPage from './pages/Ad/my-ads.page';

function App() {
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);

  return (
    <>
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="/account/reset-password" element={<ForgotPasswordRequestTokenPage />} />
        <Route path="/account/reset-password/verify/:token" element={<ForgotPasswordPage />} />

        <Route element={<Persist />}>
          <Route path="/" element={<Home />} />
          <Route path="/auto/add" element={<Ad title="Sell Your Car Now" />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/ad/:adId" element={<AdDetailsPage />} />
          <Route path="/ad/me" element={<MyAdsPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
