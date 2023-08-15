import { createSelector } from 'reselect';
import { IReduxState } from '..';

const favAdsState = (state: IReduxState) => state.favorites;

export const isFavoriteAd = (adId: string) =>
  createSelector(favAdsState, (state) => {
    return state.favoriteAds.find((favAd) => favAd.adId === adId) || null;
  });
