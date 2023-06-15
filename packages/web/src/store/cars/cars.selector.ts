import { createSelector } from '@reduxjs/toolkit';
import { IReduxState } from '..';

const carsState = (state: IReduxState) => state.cars;

export const selectCarsBrands = createSelector(carsState, (state) => state.brands);

export const selectModelsByBrand = (brand: string) =>
  createSelector(carsState, (state) => {
    console.log('i received this', brand);
    return state.models[brand] ?? [];
  });

export const selectModelsByBrandDataSource = (brand: string) =>
  createSelector(carsState, (state) => {
    if (!brand) {
      return [{ name: '' }];
    }

    if (state.models[brand]?.length === 0) {
      return [{ name: '' }];
    }

    return (
      state.models[brand]?.map((model) => ({
        name: model,
      })) ?? []
    );
  });
