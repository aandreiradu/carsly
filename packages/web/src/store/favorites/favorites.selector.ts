import { createSelector } from 'reselect';
import { IReduxState } from '..';

const favAdsState = (state: IReduxState) => state.favorites;

export const selectIsFavoriteAd = (adId: string) =>
  createSelector(favAdsState, (state) => {
    return state.favoriteAds.find((favAd) => favAd.adId === adId) || null;
  });

export const selectFavoritesCount = createSelector(favAdsState, (state) => state.count);
