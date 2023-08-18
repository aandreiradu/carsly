import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CurrencyTypes } from '../../pages/SellNow/types';

export type FavoriteCarAd = {
  adId: string | null;
  name: string | null;
  price: number | null;
  currency: CurrencyTypes | null;
  thumbnail: string | null;
  location?: string | null;
};

export interface FavoritesState {
  favoriteAds: FavoriteCarAd[];
  count: number;
}

const initialState: FavoritesState = {
  favoriteAds: [],
  count: 0,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavoriteAds(state: FavoritesState, action: PayloadAction<FavoriteCarAd[]>) {
      state.favoriteAds = action.payload;
    },

    setFavoritesCount(state: FavoritesState, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
});

export const { setFavoriteAds, setFavoritesCount } = favoritesSlice.actions;
export default favoritesSlice.reducer;
