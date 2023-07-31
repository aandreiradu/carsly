import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { TransmissionTypes } from '@prisma/client';
import { CreateAdDTO } from 'src/ads/dto/create-ad.dto';

export class CreateAdDTOMappingPipe implements PipeTransform {
  transform(body: any, metadata: ArgumentMetadata) {
    const result = new CreateAdDTO();

    console.log('body ba', body);

    return;
  }
}
