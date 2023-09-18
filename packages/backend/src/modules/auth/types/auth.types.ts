import { Request } from 'express';

export type AuthAccountCreated = {
  isSuccess: boolean;
  message?: string;
};

export type AuthTokens = {
  accessToken?: string;
  refreshToken?: string;
};

export type JWTPayload = {
  email: string;
  sub: string;
};

export type JwtPayloadWithRt = JWTPayload & { refreshToken: string };

export type GetSessionByToken = {
  refreshToken: string;
  sessionId: string;
};

export type CheckTokenValidity = {
  isValid: boolean;
  userId?: string;
  email?: string;
};

export interface RequestMetadata extends Request {
  user?: {
    userId?: string;
    refreshToken?: string;
    email?: string;
  };
}

export interface UserResetPassword {
  id: string;
  resetPasswordToken: string;
  resetPasswordTokenExpiration: Date;
  resetPasswordAttempts: number;
  resetPasswordBanTimestamp: Date;
}
