import { createSelector } from '@reduxjs/toolkit';
import { IReduxState } from '..';

const adState = (state: IReduxState) => state.ads;

export const selectOfferOfTheDay = createSelector(adState, (state) => state.offerOfTheDay);
