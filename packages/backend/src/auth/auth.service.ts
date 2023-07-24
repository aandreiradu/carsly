import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDTO, SignUpDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AuthAccountCreated, AuthTokens, JWTPayload } from './types/auth.types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
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
      throw new BadRequestException('Passwords dont match');
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
          throw new ConflictException(
            'Another account is using the same email',
          );
        }
      }

      throw new InternalServerErrorException(
        'Something went wrong, please try again later',
      );
    }
  }

  async signInLocal(
    dto: SignInDTO,
  ): Promise<AuthTokens & { firstName: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        password: true,
        email: true,
        firstName: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    const pwMatch = await argon.verify(user.password, dto.password);

    if (!pwMatch) {
      throw new BadRequestException('Invalid Credentials');
    }

    const tokens = await this.getTokens(user.id, user.email, 'ALL');
    console.log('generated tokens', tokens);

    /* hash the rt before updating in the db */

    const hashRT = await this.hashData(tokens.refreshToken);

    await this.updateRT(hashRT, user.id);

    return {
      ...tokens,
      firstName: user.firstName,
    };
  }

  async logout(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: '',
      },
    });
  }

  async getTokens(
    userId: string,
    email: string,
    type: 'ALL' | 'RT' | 'AT',
  ): Promise<AuthTokens> {
    const jwtPayload: JWTPayload = {
      email: email,
      sub: userId,
    };

    switch (type) {
      case 'ALL': {
        console.log('case all reached');
        const [at, rt] = await Promise.all([
          this.jwtService.signAsync(jwtPayload, {
            expiresIn: '15m',
            secret: this.config.getOrThrow<string>('__AT_SECRET'),
          }),
          this.jwtService.signAsync(jwtPayload, {
            expiresIn: '1d',
            secret: this.config.getOrThrow<string>('__RT_SECRET'),
          }),
        ]);

        return {
          accessToken: at,
          refreshToken: rt,
        };
      }

      case 'AT': {
        const accessToken = await this.jwtService.signAsync(jwtPayload, {
          expiresIn: '15m',
          secret: this.config.getOrThrow<string>('__AT_SECRET'),
        });

        return {
          accessToken,
        };
      }

      case 'RT': {
        const refreshToken = await this.jwtService.signAsync(jwtPayload, {
          expiresIn: '1d',
          secret: this.config.getOrThrow<string>('__RT_SECRET'),
        });

        return {
          refreshToken: refreshToken,
        };
      }

      default: {
        throw new Error(`Unhandled getToken type ${type}`);
      }
    }
  }

  async updateRT(refreshToken: string, userId: string) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
  }

  async checkRTHashing(
    userdId: string,
    refreshToken: string,
  ): Promise<boolean> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: userdId,
        },
        select: {
          refreshToken: true,
        },
      });

      if (!user) {
        console.log('checkRTHashing user not found');
        /* if no user was found in the db based on the provided RT, will throw exception */
        throw new UnauthorizedException();
      }

      /* check hashed tokens */
      const matchRTHash = await argon.verify(user.refreshToken, refreshToken);

      if (!matchRTHash) {
        console.log('checkRTHashing RT hash dont match');
        /* If the tokens dont match, will throw exception */
        throw new UnauthorizedException();
      }

      return true;
    } catch (error) {
      console.log('error checkRTHashing', error);

      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error('Something went wrong');
    }
  }

  async hashData(data: string) {
    return await argon.hash(data);
  }
}
