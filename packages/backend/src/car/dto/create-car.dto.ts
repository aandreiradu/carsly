import {
  IsEnum,
  IsNotEmpty,
  IsString,
  isEnum,
  isString,
} from 'class-validator';
import { VehicleBodyType, VehicleCategory } from '../types';

export class CreateCarDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(VehicleCategory)
  vehicleCategory: VehicleCategory;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(VehicleBodyType)
  bodyType: VehicleBodyType;
}
