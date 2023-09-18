import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ResetPasswordPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log('transform triggered', value, metadata);
    if (value === undefined || !Object.keys(value).length) {
      throw new BadRequestException(
        'Validation failed: Missing email or username',
      );
    }

    return value;
  }
}
