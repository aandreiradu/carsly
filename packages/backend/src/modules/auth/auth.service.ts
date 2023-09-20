import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { SignInDTO, SignUpDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import {
  AuthAccountCreated,
  AuthTokens,
  JWTPayload,
  UserResetPassword,
} from './types/auth.types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GetTokenResetPasswordDTO } from './dto/reset-password.dto';
import { CryptoService } from '@common/utils/crypto';
import { isNestError } from '@common/utils/errors';
import { SendGridService } from '@modules/send-grid/send-grid.service';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private crypto: CryptoService,
    private sendGridService: SendGridService,
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

      if (!user || !user?.refreshToken) {
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
        throw error;
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async hashData(data: string) {
    return await argon.hash(data);
  }

  isUserBanned(userResetPassword: UserResetPassword): boolean {
    if (!userResetPassword.resetPasswordBanTimestamp) {
      return false;
    }

    const now = Date.now();
    if (new Date(now) > userResetPassword.resetPasswordBanTimestamp) {
      /*
       * Ban expired.
       * Force reset password attempts reset. In this case, we dont have to run 2 updates
       * Passed by refference, we're going to modify the result of user query.
       */
      userResetPassword.resetPasswordAttempts = 0;
      return false;
    }

    return true;
  }

  async sendResetPasswordToken(dto: GetTokenResetPasswordDTO): Promise<void> {
    try {
      const user = await this.getResetPasswordUser(dto);
      let token = null;

      if (!user || !Object.keys(user)) {
        throw new BadRequestException('No account associated with this email');
      }

      /*
       * Before generating a new token, make sure that user does not have any active bans
       */
      const userBanned = this.isUserBanned(user);
      if (userBanned) {
        throw new ConflictException(
          `Your account is locked until ${user.resetPasswordBanTimestamp}`,
        );
      }

      const now = Date.now();
      const maxResetPasswordsAttempts =
        +this.config.getOrThrow<number>('RESET_MAX_ATTEMPTS');

      if (user.resetPasswordAttempts + 1 > maxResetPasswordsAttempts) {
        const banUntil = +this.config.getOrThrow<number>('RESET_PASSWORD_BAN');
        const banTimestamp = new Date(now + +(banUntil || 900) * 1000);
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            resetPasswordBanTimestamp: banTimestamp,
            resetPasswordAttempts: maxResetPasswordsAttempts,
          },
        });
        console.log(`${user.id} was banned until ${banTimestamp}`);
        throw new ConflictException(
          `You have exceeded token generation limit. Your account was disabled for 1 hour`,
        );
      }

      token = this.crypto.generateRandomBytes();
      const tokenExpiration = +this.config.getOrThrow<number>(
        'RESET_PASSWORD_TOKEN_EXPIRATION',
      );
      const resetTokenExpireDate = new Date(now + tokenExpiration * 1000);

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          resetPasswordToken: token,
          resetPasswordTokenExpiration: resetTokenExpireDate,
          resetPasswordAttempts: user.resetPasswordAttempts + 1,
          resetPasswordBanTimestamp: null,
        },
      });

      const frontBaseURL = this.config.getOrThrow<string>('FRONTEND_BASE_URL');
      const resetPasswordLink = new URL(
        `${frontBaseURL}/account/reset-password/verify/${token}`,
      ).toString();

      if (+this.config.getOrThrow<number>('PRODUCTION')) {
        await this.sendGridService.sendMail({
          from: 'raduandrei697@gmail.com',
          subject: 'Reset Password Request',
          to: dto.email,
          text: `Reset password link ${resetPasswordLink}`,
          html: `<strong>Reset password link ${resetPasswordLink}</strong>`,
        });
      } else {
        console.log('resetPasswordLink', resetPasswordLink);
      }
    } catch (error) {
      console.log(`Error RESET PASSWORD TOKEN`, error);

      if (isNestError(error)) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  async getResetPasswordUser(dto: GetTokenResetPasswordDTO) {
    return this.prisma.user.findFirst({
      where: {
        ...dto,
      },
      select: {
        id: true,
        resetPasswordAttempts: true,
        resetPasswordToken: true,
        resetPasswordTokenExpiration: true,
        resetPasswordBanTimestamp: true,
      },
    });
  }

  async getUserByResetToken(
    token: string,
  ): Promise<{ id: string; resetPasswordTokenExpiration: Date }> {
    return this.prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordTokenExpiration: {
          gte: new Date(),
        },
      },
      select: {
        id: true,
        resetPasswordTokenExpiration: true,
      },
    });
  }

  async verifyResetTokenPassword(token: string): Promise<{ id: string }> {
    const user = await this.getUserByResetToken(token);

    if (!user || !Object.keys(user).length) {
      throw new UnauthorizedException('Invalid token');
    }

    const now = new Date(Date.now());
    if (now > user.resetPasswordTokenExpiration) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }

  async resetPassword(password: string, token: string): Promise<void> {
    const user = await this.verifyResetTokenPassword(token);
    const hashPassword = await this.hashData(password);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashPassword,
        resetPasswordAttempts: 0,
        resetPasswordBanTimestamp: null,
        resetPasswordToken: null,
        resetPasswordTokenExpiration: null,
      },
    });

    return;
  }
}
