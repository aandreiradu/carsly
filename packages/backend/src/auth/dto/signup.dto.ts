import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(1, {
    message: 'First Name must be longer than or equal to 4 characters',
  })
  @MaxLength(20, {
    message: 'First Name must be shorter than or equal to 20 characters',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1, {
    message: 'Last Name must be longer than or equal to 4 characters',
  })
  @MaxLength(20, {
    message: 'Last Name must be shorter than or equal to 20 characters',
  })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1, {
    message: 'Password must be longer than or equal to 4 characters',
  })
  @MaxLength(35, {
    message: 'Password must be shorter than or equal to 35 characters',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1, {
    message: 'Confirm Password must be longer than or equal to 4 characters',
  })
  @MaxLength(35, {
    message: 'Confirm Password must be shorter than or equal to 35 characters',
  })
  confirmPassword: string;
}
