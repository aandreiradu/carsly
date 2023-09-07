import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface FetchModelsByBrand {
  status: number;
  brandModels: Record<string, string[]>;
  brand: string;
}

export interface SearchAdRes {
  results: {
    KM: number;
    bodyType: string;
    color: string;
    colorType: string;
    currency: string;
    fuelType: string;
    images: string;
    noOfDoors: number;
    price: number;
    sellerCity: string;
    sellerFullName: string;
    sellerPhoneNumber: string;
    title: string;
    vehicleOrigin: string;
    year: number;
  };
  resultsCount: number;
}

// queries = {
//     'brand=audi&model=a7' : {
//        results:  Pick<>,
//        count: number
//     }
// }

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
