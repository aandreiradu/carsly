import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Min,
  isEmail,
  Max,
} from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  @Min(1, {
    message: 'First Name must be longer than or equal to 4 characters',
  })
  @Max(20, {
    message: 'First Name must be shorter than or equal to 20 characters',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Min(1, { message: 'Last Name must be longer than or equal to 4 characters' })
  @Max(20, {
    message: 'Last Name must be shorter than or equal to 20 characters',
  })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Min(1, { message: 'Password must be longer than or equal to 4 characters' })
  @Max(35, {
    message: 'Password must be shorter than or equal to 35 characters',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Min(1, {
    message: 'Confirm Password must be longer than or equal to 4 characters',
  })
  @Max(35, {
    message: 'Confirm Password must be shorter than or equal to 35 characters',
  })
  confirmPassword: string;
}
