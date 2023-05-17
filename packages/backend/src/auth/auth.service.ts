import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AuthAccountCreated } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUpLocal(dto: SignUpDTO): Promise<AuthAccountCreated> {
    const { confirmPassword, password } = dto;

    if (confirmPassword !== password) {
      throw new ForbiddenException('Passwords dont match');
    }

    try {
      delete dto.confirmPassword;

      const hashedPw = await this.hashData(password);

      await this.prisma.user.create({
        data: {
          ...dto,
          password: hashedPw,
        },
      });
      return {
        isSuccess: true,
        message: 'Account created successfully',
      };
    } catch (error) {
      if (error.constructor.name === PrismaClientKnownRequestError.name) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials incorrect');
        }
      }

      throw new InternalServerErrorException(
        'Something went wrong, please try again later',
      );
    }
  }

  async hashData(data: string) {
    return await argon.hash(data);
  }
}
