import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SignInDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, {
    message: 'Password must be longer than or equal to 4 characters',
  })
  @MaxLength(35, {
    message: 'Password must be shorter than or equal to 35 characters',
  })
  password: string;
}
