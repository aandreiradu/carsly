import { useDispatch } from 'react-redux';
import { IGetFavoriteAds } from '../../types/ad.types';
import useHttpRequest from '../useHttpRequest/useHttp.hook';
import { setFavoriteAds, setFavoritesCount } from '../../store/favorites/favorites.slice';

const useGetFavoriteAds = () => {
  const dispatch = useDispatch();
  const {
    data: favoriteAdsData,
    sendRequest: SRGetFavoritesAds,
    error: errorFavoritesAds,
    loading: loadingFavoriteAds,
  } = useHttpRequest<IGetFavoriteAds>();

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

  return {
    getFavoritesAdsByUser,
    errorFavoritesAds,
    loadingFavoriteAds,
    favoriteAdsData,
  };
};

export default useGetFavoriteAds;
