import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userSlice, { IUserState } from './user/user.slice';

export interface IReduxState {
  user: IUserState;
}

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
