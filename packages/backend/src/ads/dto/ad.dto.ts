import { IsNotEmpty, IsString } from 'class-validator';

export class AdDetailsDto {
  @IsNotEmpty()
  @IsString()
  adId: string;
}
