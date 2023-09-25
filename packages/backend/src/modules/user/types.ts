import { CurrencyTypes, FuelType, GearboxTypes } from '@prisma/client';

export interface UserAds {
  id: string;
  KM: number;
  year: number;
  fuelType: FuelType;
  power: number;
  gearbox: GearboxTypes;
  title: string;
  price: number;
  currency: CurrencyTypes;
  thumbnail: string;
  sellerCity: string;
}
