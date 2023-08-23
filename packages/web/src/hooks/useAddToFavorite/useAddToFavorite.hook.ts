import { useDispatch } from 'react-redux';
import useHttpRequest from '../useHttpRequest/useHttp.hook';
import { useCallback } from 'react';
import { FavoriteCarAd, setFavoriteAds, setFavoritesCount } from '../../store/favorites/favorites.slice';

interface UseAddToFavorite {
  isOfferOfTheDay?: boolean;
}

const useAddToFavorite = ({ isOfferOfTheDay = false }: UseAddToFavorite) => {
  const dispatch = useDispatch();
  const { sendRequest: sendRequestFavorites, loading: loadingFavorites, error: errorFavorites } = useHttpRequest();

  const handleAddToFavorite = useCallback(async (ad: FavoriteCarAd) => {
    if (loadingFavorites) return;

    const abortController = new AbortController();
    const responseFavorites = await sendRequestFavorites('/api/ad/favorites', {
      method: 'POST',
      data: {
        adId: ad.adId,
        isOfferOfTheDay,
      },
      withCredentials: true,
      signal: abortController.signal,
    });

    if (responseFavorites && responseFavorites.status === 200) {
      const { count, favorites } = responseFavorites.data || {};
      if (count && +count > 0) {
        dispatch(setFavoritesCount(count));
      }

      if (favorites && favorites?.length) {
        dispatch(setFavoriteAds(favorites));
      }
    }

    return responseFavorites;
  }, []);

  return {
    handleAddToFavorite,
    loadingFavorites,
    errorFavorites,
  };
};

export default useAddToFavorite;
