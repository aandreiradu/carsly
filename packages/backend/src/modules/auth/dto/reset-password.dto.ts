import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class GetTokenResetPasswordDTO {
  // @Validate(ResetPasswordValidator)
  // @IsOptional()
  @IsEmail()
  public readonly email: string;

  // @Validate(ResetPasswordValidator)
  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // public readonly username?: string;
}

export class ResetPasswordDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password should contain at least 6 characters' })
  @MaxLength(30, { message: 'Password cannot exceed 30 characters' })
  public readonly password: string;
}
