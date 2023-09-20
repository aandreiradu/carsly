import { ConfirmPasswordValidator } from '@common/utils/customValidator.utils';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

export class GetTokenResetPasswordDTO {
  @IsEmail({}, { message: 'Invalid email format' })
  public readonly email: string;
}

export class ResetPasswordDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password should contain at least 6 characters' })
  @MaxLength(30, { message: 'Password cannot exceed 30 characters' })
  public readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Confirm Password should contain at least 6 characters',
  })
  @MaxLength(30, { message: 'Confirm Password cannot exceed 30 characters' })
  @Validate(ConfirmPasswordValidator)
  public readonly confirmPassword: string;
}
