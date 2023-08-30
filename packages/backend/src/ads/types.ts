import {
  Ad,
  CurrencyTypes,
  FuelType,
  PolluationNormTypes,
  TransmissionTypes,
} from '@prisma/client';

export interface GetOfferOfTheDay {
  adId: string;
  thumbnail: string;
  title: string;
  fuel: FuelType;
  price: number;
  currency: CurrencyTypes;
  year: number;
  km: number;
  engineSize: number;
  description?: string;
}

export interface LatestAd {
  adId: string;
  name: string;
  price: number;
  currency: CurrencyTypes;
  thumbnail: string;
  location?: string;
}

export type TAdDetailsById = Ad & {
  brandName: string;
  modelName: string;
  transmission: TransmissionTypes;
  polluationNorm: PolluationNormTypes;
};
