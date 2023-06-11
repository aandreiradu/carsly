import { createSelector } from '@reduxjs/toolkit';
import { IReduxState } from '..';

const carsState = (state: IReduxState) => state.cars;

export const selectCarsBrands = createSelector(carsState, (state) => state.brands);
