import { z } from 'zod';
import {
  Currency,
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
  KM: z.number().min(0),
  dayOfRegistration: z.number().min(1).max(31),
  monthOfRegistration: z.number().min(1).max(12),
  yearOfRegistration: z.number().min(1900),

  // Technical Details
  year: z.number().min(1900),
  brand: z.string().min(1),
  model: z.string().min(1),
  fuel: z.nativeEnum(FuelType),
  power: z.number(),
  engineSize: z.number(),
  noOfDoors: z.number().min(1),
  gearbox: z.nativeEnum(GearboxTypes),
  transmission: z.nativeEnum(TransmissionTypes),
  polluationNorm: z.nativeEnum(PolluationNormTypes),
  co2emissions: z.number().optional(),

  // Body Type details
  bodyType: z.nativeEnum(VehicleBodyType),
  color: z.string().nonempty(),
  seats: z.number(),

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
  price: z.number().min(1),
  currency: z.nativeEnum(Currency),

  //   Price details
  isNegotiable: z.boolean(),
  isLeasing: z.boolean(),

  //   Seller Details
  sellerFullName: z.string().nonempty(),
  sellerCity: z.string().nonempty(),
  sellerPhoneNumber: z.string().min(10),
});

export type AdProps = z.infer<typeof adSchema>;
