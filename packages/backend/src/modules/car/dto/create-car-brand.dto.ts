import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCarBrandDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  yearOfEst?: string;
}
