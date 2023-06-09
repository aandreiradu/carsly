import { VehicleBodyType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  CarsColorsTypes,
  ColorTypes,
  CountriesTypes,
  CurrencyTypes,
  FuelType,
  GearboxTypes,
  PolluationNormTypes,
  TransmissionTypes,
} from 'src/car/types';

export class CreateAdDTO {
  @IsOptional()
  isDamaged: boolean;

  @IsOptional()
  isRightHandDrive: boolean;

  @IsOptional()
  isImported: boolean;

  @IsNotEmpty()
  @IsString()
  @MaxLength(13, { message: 'VIN must not exceed 13 characters' })
  @MinLength(13, { message: 'VIN must have 13 characters' })
  VIN: string;

  @IsNumber({ allowNaN: false })
  @Min(1, {
    message: 'The number of kilometers should be greater or equal than 1',
  })
  KM: number;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  @Min(1, { message: 'Day of registration should be between 1 - 31' })
  @Max(31, { message: 'Day of registration should be between 1 - 31' })
  dayOfRegistration: number;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  @Min(1, { message: 'Month of registration should be between 1 - 12' })
  @Max(31, { message: 'Month of registration should be between 1 - 12' })
  monthOfRegistration: number;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  @Min(1900, {
    message: 'Year of registration should be greater than or equal to 1900',
  })
  yearOfRegistration: number;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  @Min(1900, {
    message:
      'Please input a valid year. Accepted values 1900 - ${new Date().getFullYear()}',
  })
  year: number;

  @IsNotEmpty()
  @IsString({ message: 'Please select the brand' })
  brand: string;

  @IsNotEmpty()
  @IsString({ message: 'Please select the brand' })
  model: string;

  @IsNotEmpty()
  @IsEnum(FuelType, { message: 'Please select the fuel type' })
  fuel: string;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  @Min(1, { message: 'Value should be greater than or equal to 1' })
  power: number;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  @Min(1, { message: 'Please insert the engine size' })
  engineSize: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Please select the number of doors' })
  noOfDoors: number;

  @IsNotEmpty()
  @IsEnum(GearboxTypes, { message: 'Please select the gearbox type' })
  gearbox: string;

  @IsNotEmpty()
  @IsEnum(TransmissionTypes, { message: 'Please select the transmission type' })
  transmission: string;

  @IsNotEmpty()
  @IsEnum(PolluationNormTypes, { message: 'Please select the polluation norm' })
  polluationNorm: string;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'The value should be greater than or equal to 1' })
  co2emissions: number;

  @IsNotEmpty()
  @IsEnum(VehicleBodyType, { message: 'Please select a vehicle body type' })
  bodyType: string;

  @IsNotEmpty()
  @IsEnum(CarsColorsTypes, { message: 'Please select a color' })
  color: string;

  @IsNotEmpty()
  @IsEnum(ColorTypes, { message: 'Please select a color type' })
  colorType: string;

  @IsNumber()
  @Min(1, { message: 'Please select the number of seats' })
  seats: number;

  @IsOptional()
  @IsUrl()
  youtubeVideo: string;

  @IsNotEmpty()
  @IsString()
  adTitle: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(CountriesTypes, { message: 'Please select a country' })
  vehicleOrigin: string;

  @IsOptional()
  @IsBoolean()
  isFirstOwner: boolean;

  @IsOptional()
  @IsBoolean()
  isWithoutAccident: boolean;
  @IsOptional()
  @IsBoolean()
  isRegistered: boolean;

  @IsOptional()
  @IsBoolean()
  isServiceCardAvailable: boolean;

  @IsOptional()
  @IsBoolean()
  isVintageCar: boolean;

  @IsOptional()
  @IsBoolean()
  hasTuning: boolean;

  @IsNumber()
  @Min(1, { message: 'The price should be a positive number' })
  price: number;

  @IsNotEmpty()
  @IsEnum(CurrencyTypes, { message: 'Please select the currency' })
  currency: string;

  @IsOptional()
  @IsBoolean()
  isNegotiable: boolean;

  @IsOptional()
  @IsBoolean()
  isLeasing: boolean;

  @IsNotEmpty()
  @IsString()
  @MinLength(1, { message: 'Seller name should cointain at least 1 character' })
  sellerFullName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1, { message: 'Seller city should cointain at least 1 character' })
  sellerCity: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1, {
    message: 'Seller phone number should cointain at least 10 characters',
  })
  sellerPhoneNumber: string;
}
