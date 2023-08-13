import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userSlice, { IUserState } from './user/user.slice';
import carsSlice, { CarsState } from './cars/cars.slice';
import adSlice, { IADState } from './ad/ad.slice';

export interface IReduxState {
  user: IUserState;
  cars: CarsState;
  ads: IADState;
}

export const store = configureStore({
  reducer: {
    user: userSlice,
    cars: carsSlice,
    ads: adSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
