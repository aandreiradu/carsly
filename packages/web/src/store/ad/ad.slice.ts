import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  CarsColorsTypes,
  ColorTypes,
  CountriesTypes,
  CurrencyTypes,
  FuelType,
  GearboxTypes,
  PolluationNormTypes,
  TransmissionTypes,
  VehicleBodyType,
} from '../../pages/SellNow/types';

export enum AdStatus {
  'PENDING' = 'PENDING',
  'ACCEPTED' = 'ACCEPTED',
  'DELETED' = 'DELETED',
  'EXPIRED' = 'EXPIRED',
}

interface Ad {
  id: string;
  isDamaged: boolean | null;
  isRightHandDrive: boolean | null;
  isImported: boolean | null;
  VIN: string;
  KM: number;
  dayOfRegistration: number;
  monthOfRegistration: number;
  yearOfRegistration: number;
  year: number;
  fuelType: FuelType;
  power: number;
  engineSize: number;
  noOfDoors: number;
  gearbox: GearboxTypes;
  transmission: TransmissionTypes;
  polluationNorm: PolluationNormTypes;
  co2emissions: number | null;
  bodyType: VehicleBodyType;
  color: CarsColorsTypes;
  colorType: ColorTypes;
  seats: number;
  youtubeVideo: string | null;
  title: string;
  description: string | null;
  vehicleOrigin: CountriesTypes;
  isFirstOwner: boolean | null;
  isWithoutAccident: boolean | null;
  isRegistered: boolean | null;
  isServiceCardAvailable: boolean | null;
  isVintageCar: boolean | null;
  hasTuning: boolean | null;
  price: number;
  currency: CurrencyTypes;
  isNegotiable: boolean | null;
  isLeasing: boolean | null;
  sellerFullName: string;
  sellerCity: string;
  sellerPhoneNumber: string;
  status: AdStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  carBrandId: string;
  carModelId: string;
}

export interface OfferOfTheDay {
  adId: string;
  imageURL: string;
  title: string;
  fuel: FuelType;
  price: number;
  currency: CurrencyTypes;
  year: number;
  km: number;
  engineSize: number;
  description?: string;
}

export interface IADState {
  ads: Ad[];
  offerOfTheDay: OfferOfTheDay | null;
}

const initialState: IADState = {
  ads: [],
  offerOfTheDay: null,
};

export const adSlice = createSlice({
  name: 'ad',
  initialState,
  reducers: {
    insertAd(state: IADState, action: PayloadAction<Ad>) {
      state.ads.push(action.payload);
    },
    setOfferOfTheDay(state: IADState, action: PayloadAction<OfferOfTheDay>) {
      state.offerOfTheDay = action.payload;
    },
  },
});

export const { insertAd, setOfferOfTheDay } = adSlice.actions;
export default adSlice.reducer;
