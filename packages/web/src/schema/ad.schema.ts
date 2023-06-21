import { z } from 'zod';
import {
  CarsColorsTypes,
  ColorTypes,
  CurrencyTypes,
  FuelType,
  GearboxTypes,
  PolluationNormTypes,
  TransmissionTypes,
  VehicleBodyType,
} from '../pages/SellNow/types';

export const adSchema = z.object({
  isDamaged: z.boolean().optional(),
  isRightHandDrive: z.boolean().optional(),
  isImported: z.boolean().optional(),

  // General Informations
  VIN: z.string().nonempty(),
  KM: z.string().min(0),
  dayOfRegistration: z.string().min(1).max(31),
  monthOfRegistration: z.string().min(1).max(12),
  yearOfRegistration: z.string().min(1900),

  // Technical Details
  year: z.string().min(1900),
  brand: z.string().min(1),
  model: z.string().min(1),
  fuel: z.nativeEnum(FuelType),
  power: z.string().min(1),
  engineSize: z.string().min(1),
  noOfDoors: z.string().min(1),
  gearbox: z.nativeEnum(GearboxTypes),
  transmission: z.nativeEnum(TransmissionTypes),
  polluationNorm: z.nativeEnum(PolluationNormTypes),
  co2emissions: z.string().optional(),

  // Body Type details
  bodyType: z.nativeEnum(VehicleBodyType),
  color: z.nativeEnum(CarsColorsTypes),
  colorType: z.nativeEnum(ColorTypes),
  seats: z.string(),

  youtubeVideo: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  vehicleOrigin: z.string().optional(),

  // Vehicle Status
  isFirstOwner: z.boolean().optional(),
  isWithoutAccident: z.boolean().optional(),
  isRegistered: z.boolean().optional(),
  isServiceCardAvailable: z.boolean().optional(),
  isVintageCar: z.boolean().optional(),
  hasTuning: z.boolean().optional(),

  //   Price
  price: z.string().min(1),
  currency: z.nativeEnum(CurrencyTypes),

  //   Price details
  isNegotiable: z.boolean(),
  isLeasing: z.boolean(),

  //   Seller Details
  sellerFullName: z.string().nonempty().min(1, { message: 'Please insert the seller name' }),
  sellerCity: z.string().nonempty().min(1, { message: 'Please add a city' }),
  sellerPhoneNumber: z.string().nonempty().min(10, { message: 'Please add a phone number' }),
});

export type AdProps = z.infer<typeof adSchema>;
