export interface NestError {
  response: {
    statusCode: 409;
    message: string;
    error: string;
  };
  status?: number;
}
// statusCode: number;
// message?: string;
// error: string;
