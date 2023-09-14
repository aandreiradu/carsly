import { IsArray, IsNotEmpty } from 'class-validator';

export class BrandsDTO {
  @IsNotEmpty()
  @IsArray()
  brands: {
    name: string;
    description: string;
  }[];
}
