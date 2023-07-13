import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { VehicleBodyType } from '@prisma/client';

export class CreateCarModelDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsEnum(VehicleBodyType)
  @IsNotEmpty()
  bodyType: VehicleBodyType;
}
