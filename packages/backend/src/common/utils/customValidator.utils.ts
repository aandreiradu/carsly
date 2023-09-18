import { BadRequestException } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'priceRange', async: false })
export class PriceRangeValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const priceMin = args.object['priceMin'];

    if (value !== undefined && priceMin !== undefined && value < priceMin) {
      throw new BadRequestException(
        'Price Max should be greater than or equal to Price Min',
      );
    }

    return true;
  }

  defaultMessage() {
    return 'Price Max should be greater than or equal to Price Min';
  }
}

@ValidatorConstraint({ name: 'powerRange', async: false })
export class PowerRangeValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const powerMin = args.object['powerMin'];

    if (value !== undefined && powerMin !== undefined && value < powerMin) {
      throw new BadRequestException(
        'Power Max should be greater than or equal to Power Min',
      );
    }

    return true;
  }

  defaultMessage() {
    return 'Power Max should be greater than or equal to Power Min';
  }
}

@ValidatorConstraint({ name: 'resetPasswordValidator', async: false })
export class ResetPasswordValidator implements ValidatorConstraintInterface {
  validate(_, args: ValidationArguments) {
    const email = args.object['email'];
    const username = args.object['username'];

    console.log({
      email,
      username,
    });

    if (!email && !username) {
      throw new BadRequestException('Missing email or username');
    }

    return true;
  }
}
