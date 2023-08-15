import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userSlice, { IUserState } from './user/user.slice';
import carsSlice, { CarsState } from './cars/cars.slice';
import adSlice, { IADState } from './ad/ad.slice';
import favoritesSlice, { FavoritesState } from './favorites/favorites.slice';

export interface IReduxState {
  user: IUserState;
  cars: CarsState;
  ads: IADState;
  favorites: FavoritesState;
}

export const store = configureStore({
  reducer: {
    user: userSlice,
    cars: carsSlice,
    ads: adSlice,
    favorites: favoritesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
