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
} from '../pages/SellNow/types';
import { AdStatus } from '../store/ad/ad.slice';

export type AdPageProps = {
  title: string;
};

export interface Ad {
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
  images: {
    id: string;
    path: string;
    adId: string;
  }[];
}

export interface IGetFavoriteAds {
  count: number;
  favorites: {
    adId: string;
    name: string;
    price: number;
    currency: CurrencyTypes;
    thumbnail: string;
    location: string;
  }[];
}

export interface UserAd {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  currency: CurrencyTypes;
  year: number;
  fuelType: FuelType;
  KM: number;
  power: number;
  gearbox: GearboxTypes;
  sellerCity: string;
}

export interface LoadingContentProps {
  count?: number;
}
