import { IsEmail } from 'class-validator';

export class ResetPasswordDTO {
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
