import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Res,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDTO, SignUpDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AuthAccountCreated, AuthTokens, JWTPayload } from './types/auth.types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

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
          throw new ForbiddenException(
            'Another account is using the same email',
          );
        }
      }

      throw new InternalServerErrorException(
        'Something went wrong, please try again later',
      );
    }
  }

  async signInLocal(dto: SignInDTO): Promise<AuthTokens> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid Credentials');
    }

    const pwMatch = await argon.verify(user.password, dto.password);

    if (!pwMatch) {
      throw new ForbiddenException('Invalid Credentials');
    }

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateHashRT(user.id, tokens.refreshToken);

    console.log('return this', tokens);

    return tokens;
  }

  async getTokens(userId: string, email: string): Promise<AuthTokens> {
    const jwtPayload: JWTPayload = {
      email,
      userId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.getOrThrow<string>('__AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.getOrThrow<string>('__RT_SECRET'),
        expiresIn: '1d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async hashData(data: string) {
    return await argon.hash(data);
  }

  async updateHashRT(userId: string, refreshToken: string): Promise<void> {
    const hash = await this.hashData(refreshToken);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hash,
      },
    });
  }
}
