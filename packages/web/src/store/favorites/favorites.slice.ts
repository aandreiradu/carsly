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
}

const initialState: FavoritesState = {
  favoriteAds: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addOrRemoveAdToFavorites(state: FavoritesState, action: PayloadAction<FavoriteCarAd>) {
      const existingAd = state.favoriteAds.find((ad) => ad.adId === action.payload.adId);

      if (!existingAd) {
        console.log('nu exista');
        state.favoriteAds.push(action.payload);
      } else {
        const filteredFavAds = state.favoriteAds.filter((ad) => ad.adId !== action.payload.adId);
        console.log('exista');
        state.favoriteAds = filteredFavAds;
      }
    },
  },
});

export const { addOrRemoveAdToFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
