import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CurrencyTypes } from '../../pages/SellNow/types';

export interface FetchModelsByBrand {
  status: number;
  brandModels: Record<string, string[]>;
  brand: string;
}

export interface AdCarDetailsProps {
  id: string;
  title: string;
  year: number;
  KM: number;
  fuelType: string;
  bodyType: string;
  price: number;
  currency: CurrencyTypes;
  isNegotiable?: boolean | null;
  sellerCity: string;
  sellerFullName: string;
  sellerPhoneNumber: string;
  isLoading?: boolean;
  thumbnail: string;
  location?: string;
  engineSize: string | number;
  power: number;
  description?: string;
  userId: string;
}

export interface SearchAdRes {
  results: AdCarDetailsProps[];
  resultsCount: number;
}
interface SearchResult {
  queries: {
    [query in string]: SearchAdRes;
  };
}

export interface ISearchState {
  searchResults: SearchResult | null;
}

const initialState: ISearchState = {
  searchResults: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    saveSearch: (state: ISearchState, action: PayloadAction<SearchAdRes & { query: string }>) => {
      state.searchResults = {
        ...state.searchResults,
        queries: {
          ...state.searchResults?.queries,
          [action.payload.query]: {
            results: action.payload.results,
            resultsCount: action.payload.resultsCount,
          },
        },
      };
    },
  },
});

export const { saveSearch } = searchSlice.actions;
export default searchSlice.reducer;
