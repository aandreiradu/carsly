import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userSlice, { IUserState } from './user/user.slice';
import carsSlice, { CarsState } from './cars/cars.slice';

export interface IReduxState {
  user: IUserState;
  cars: CarsState;
}

export const store = configureStore({
  reducer: {
    user: userSlice,
    cars: carsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
