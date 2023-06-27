import { z } from 'zod';
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

export const adSchema = z.object({
  isDamaged: z.boolean().optional(),
  isRightHandDrive: z.boolean().optional(),
  isImported: z.boolean().optional(),

  // General Informations
  VIN: z
    .string({
      required_error: 'Please insert the VIN',
      invalid_type_error: 'Please insert a valid VIN',
    })
    .length(13, { message: 'Please insert a valid VIN' }),
  KM: z.coerce
    .number({
      description: 'The number of kilometers should be greater or equal than 1',
      required_error: 'The number of kilometers should be greater or equal than 1',
      invalid_type_error: 'The number of kilometers should be greater or equal than 1',
    })
    .min(1, { message: 'The number of kilometers should be greater or equal than 1' }),
  dayOfRegistration: z.coerce
    .number({
      description: 'Please insert the day of the first registration',
      required_error: 'Please insert the day of the first registration',
      invalid_type_error: 'Please insert the day of the first registration',
    })
    .min(1, { message: 'Day of registration should be between 1 - 31' })
    .max(31, { message: 'Day of registration should be between 1 - 31' }),
  monthOfRegistration: z.coerce
    .number({
      description: 'Please insert the month of the first registration',
      required_error: 'Please insert the month of the first registration',
      invalid_type_error: 'Please insert the month of the first registration',
    })
    .min(1, { message: 'Month of registration should be between 1 - 12' })
    .max(12, { message: 'Month of registration should be between 1 - 12' }),
  yearOfRegistration: z.coerce
    .number({
      description: 'Please insert the year of the first registration',
      required_error: 'Please insert the year of the first registration',
      invalid_type_error: 'Please insert the year of the first registration',
    })
    .min(1900, { message: 'Year of registration should be greater than or equal to 1900' }),

  // Technical Details
  year: z.string({
    required_error: 'Please select the year',
    invalid_type_error: `Please input a valid year. Accepted values 1900 - ${new Date().getFullYear()}`,
  }),
  brand: z
    .string({
      required_error: 'Please select the brand',
      invalid_type_error: 'Please select a valid brand',
    })
    .min(1),
  model: z
    .string({
      required_error: 'Please select a model',
      invalid_type_error: 'Please select a valid model',
    })
    .nonempty(),
  fuel: z.nativeEnum(FuelType, {
    description: 'Please select a valid fuel type',
    required_error: 'Please select a fuel type',
    invalid_type_error: 'Please select a valid fuel type',
  }),
  power: z.coerce
    .number({
      description: 'Please insert the number of horse powers',
      required_error: 'Please insert the number of horse powers',
      invalid_type_error: 'Please insert a positive number',
    })
    .min(1, { message: 'Value should be greater than or equal to 1' }),
  engineSize: z.coerce
    .number({
      description: 'Please insert the number of horse powers',
      required_error: 'Please insert the number of horse powers',
      invalid_type_error: 'Please insert a positive number',
    })
    .min(1, { message: 'Value should be greater than or equal to 1' }),
  noOfDoors: z.coerce.number({
    description: 'Please select the number of doors',
    required_error: 'Please select the number of doors',
    invalid_type_error: 'Please select the number of doors',
  }),
  gearbox: z.nativeEnum(GearboxTypes, {
    description: 'Please select the gearbox type',
    required_error: 'Please select the gearbox type',
    invalid_type_error: 'Please select a valid gearbox type',
  }),
  transmission: z.nativeEnum(TransmissionTypes, {
    description: 'Please select the transmission type',
    required_error: 'Please select the transmission type',
    invalid_type_error: 'Please select a valid transmission type',
  }),
  polluationNorm: z.nativeEnum(PolluationNormTypes, {
    description: 'Please select the polluation norm',
    required_error: 'Please select the polluation norm ',
    invalid_type_error: 'Please select a valid polluation norm ',
  }),
  co2emissions: z.coerce.number().min(1, { message: 'The value should be greater than or equal to 1' }).optional(),

  // Body Type details
  bodyType: z.nativeEnum(VehicleBodyType, {
    description: 'Please select the body type',
    required_error: 'Please select the body type',
    invalid_type_error: 'Please select a valid body type',
  }),
  color: z.nativeEnum(CarsColorsTypes, {
    description: 'Please select the color',
    required_error: 'Please select the color',
    invalid_type_error: 'Please select a valid color',
  }),
  colorType: z.nativeEnum(ColorTypes, {
    description: 'Please select the color type',
    required_error: 'Please select the color type',
    invalid_type_error: 'Please select a valid color type',
  }),
  seats: z.coerce.number({
    description: 'Please select the number of seats',
    required_error: 'Please select the number of seats',
    invalid_type_error: 'Please select the number of seats',
  }),
  youtubeVideo: z.string().url().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  vehicleOrigin: z.nativeEnum(CountriesTypes, {
    description: 'Please select a country',
    required_error: 'Please select a country',
    invalid_type_error: 'Please select a valid country',
  }),
  // Vehicle Status
  isFirstOwner: z.boolean().optional(),
  isWithoutAccident: z.boolean().optional(),
  isRegistered: z.boolean().optional(),
  isServiceCardAvailable: z.boolean().optional(),
  isVintageCar: z.boolean().optional(),
  hasTuning: z.boolean().optional(),

  //   Price
  price: z.coerce
    .number({
      description: 'Please insert the price',
      required_error: 'Please insert the price',
      invalid_type_error: 'The price should be a positive number',
    })
    .min(1, { message: 'Value should be greater than or equal to 1' }),

  currency: z.nativeEnum(CurrencyTypes, {
    description: 'Please select the currency',
    required_error: 'Please select the currency',
    invalid_type_error: 'Please select a valid country',
  }),

  //   Price details
  isNegotiable: z.boolean().optional(),
  isLeasing: z.boolean().optional(),

  //   Seller Details
  sellerFullName: z
    .string({
      description: 'Please insert the name of the seller',
      required_error: 'Please insert the name of the seller',
      invalid_type_error: 'Seller name should cointain at least 1 character',
    })
    .min(1, { message: 'Please insert the name of the seller' }),
  sellerCity: z
    .string({
      description: 'Please insert the city of the seller',
      required_error: 'Please insert the city of the seller',
      invalid_type_error: 'Seller city should cointain at least 1 character',
    })
    .min(1, { message: 'Please insert the city of the seller' }),
  sellerPhoneNumber: z
    .string({
      description: 'Please insert the phone number of the seller',
      required_error: 'Please insert the phone number of the seller',
      invalid_type_error: 'Seller phone number should cointain at least 10 character',
    })
    .min(10, { message: 'Please insert the phone number of the seller' }),
});

export type AdProps = z.infer<typeof adSchema>;
