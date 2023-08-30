import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CarBrand = {
  description: string;
  name: string;
  yearOfEST: string;
  logoUrl: string;
};

export interface CarsState {
  brands: CarBrand[];
  models: Record<string, string[]>;
}

const initialState: CarsState = {
  brands: [],
  models: {},
};

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCarsBrands: (state: CarsState, action: PayloadAction<{ carsBrands: CarBrand[] }>) => {
      const { carsBrands } = action.payload;
      state.brands = carsBrands;
    },

    setModelsByBrand: (state: CarsState, action: PayloadAction<{ brand: string; models: string[] }>) => {
      const { brand, models } = action.payload;
      state.models[brand] = models;
    },
  },
});

export const { setCarsBrands, setModelsByBrand } = carsSlice.actions;
export default carsSlice.reducer;
