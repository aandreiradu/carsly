import { IsOptional, IsString } from 'class-validator';

export class AddFavoriteDTO {
  @IsString()
  adId: string;

  @IsString()
  userId: string;

  @IsOptional()
  isOfferOfTheDay: boolean;
}
