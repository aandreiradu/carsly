export type AuthAccountCreated = {
  isSuccess: boolean;
  message?: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

export type JWTPayload = {
  userId: string;
  email: string;
};
