export type SuccessResponse<T = any> = {
  status: number;
  message?: string;
  data?: T;
};

export type ErrorResponse<T = any> = {
  status: string;
  code?: number;
  message?: string;
  error?: T;
};
