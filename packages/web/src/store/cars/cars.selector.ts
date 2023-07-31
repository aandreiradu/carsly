import { createSelector } from '@reduxjs/toolkit';
import { IReduxState } from '..';

const carsState = (state: IReduxState) => state.cars;

export const selectCarsBrands = createSelector(carsState, (state) => state.brands);

export const selectModelsByBrand = (brand: string) =>
  createSelector(carsState, (state) => {
    return state.models[brand] ?? [];
  });

export const selectModelsByBrandDataSource = (brand: string) =>
  createSelector(carsState, (state) => {
    if (!brand) {
      return [];
    }

    if (state.models[brand]?.length === 0) {
      return [{ value: '', label: '' }];
    }

    return (
      state.models[brand]?.map((model) => ({
        value: model,
        label: model,
      })) ?? []
    );
  });

export const getAllModels = () => createSelector(carsState, (state) => state.models);
