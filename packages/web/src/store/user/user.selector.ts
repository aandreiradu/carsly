import { createSelector } from '@reduxjs/toolkit';
import { IReduxState } from '..';

const userState = (state: IReduxState) => state.user;

export const selectAccessToken = createSelector(userState, (state) => ({
  accessToken: state.accessToken,
}));

export const selectUserData = createSelector(userState, (state) => state);
