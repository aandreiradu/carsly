import { createSelector } from '@reduxjs/toolkit';
import { IReduxState } from '..';

const adState = (state: IReduxState) => state.ads;

export const selectOfferOfTheDay = createSelector(adState, (state) => state.offerOfTheDay);

export const selectLatestAds = createSelector(adState, (state) => state.latestAds);

export const selectMyAds = createSelector(adState, (state) => state.myAds);

export const selectMyAdsCount = createSelector(adState, (state) => state.myAdsCount);
