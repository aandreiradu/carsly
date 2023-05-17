import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Min,
  isEmail,
  Max,
} from 'class-validator';

export class SignInDTO {
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
}
