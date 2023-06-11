import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CarBrand = {
  description: string;
  name: string;
  yearOfEST: string;
  logoUrl: string;
};

export interface CarsState {
  brands: CarBrand[];
}

const initialState: CarsState = {
  brands: [],
};

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCarsBrands: (state: CarsState, action: PayloadAction<{ carsBrands: CarBrand[] }>) => {
      const { carsBrands } = action.payload;
      state.brands = carsBrands;
    },
  },
});

export const { setCarsBrands } = carsSlice.actions;
export default carsSlice.reducer;
