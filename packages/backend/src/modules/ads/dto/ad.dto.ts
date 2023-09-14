import {
  CarsColors,
  CountriesTypes,
  FuelType,
  GearboxTypes,
  VehicleBodyType,
} from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Validate,
} from 'class-validator';
import {
  PowerRangeValidator,
  PriceRangeValidator,
} from '@common/utils/customValidator.utils';

export class AdDetailsDto {
  @IsNotEmpty()
  @IsString()
  adId: string;
}

export class QueryAdDTO {
  @Type(() => String)
  @IsString({ message: 'Brand is required' })
  @IsNotEmpty({ message: 'Brand cannot be empty' })
  public readonly brand: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  public readonly model: string;

  @Type(() => String)
  @IsEnum(FuelType)
  @IsOptional()
  public readonly fuel: FuelType;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  public readonly kmUpTo: number;

  // @Type(() => Number)
  // @IsOptional()
  // @IsNumber()
  // @Min(0, { message: 'Price min cannot be negative' })
  // public readonly priceMin: number;

  // @Type(() => Number)
  // @IsOptional()
  // @IsNumber()
  // @Min(0, { message: 'Price max cannot be negative' })
  // @Validate(PriceRangeValidator)
  // public readonly priceMax: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Price cannot be negative' })
  @Validate(PriceRangeValidator)
  public readonly priceUpTo: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Power min cannot be negative' })
  public readonly powerMin: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Power max cannot be negative' })
  @Validate(PowerRangeValidator)
  public readonly powerMax: number;

  @Type(() => String)
  @IsEnum(VehicleBodyType)
  @IsOptional()
  public readonly bodyType: VehicleBodyType;

  @Type(() => String)
  @IsEnum(GearboxTypes)
  @IsOptional()
  public readonly gearbox: GearboxTypes;

  @Type(() => String)
  @IsEnum(CarsColors)
  @IsOptional()
  public readonly color: CarsColors;

  @Type(() => Number)
  @IsOptional()
  public readonly year: number;

  @Type(() => String)
  @IsEnum(CountriesTypes)
  @IsOptional()
  public readonly vehicleOrigin: CountriesTypes;
}
