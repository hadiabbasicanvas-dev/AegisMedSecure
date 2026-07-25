import { Response } from 'express';

export interface ApiResponseOptions<T = any> {
  res: Response;
  statusCode?: number;
  success?: boolean;
  message?: string;
  data?: T;
  meta?: any;
  error?: any;
}

export const sendApiResponse = <T>({
  res,
  statusCode = 200,
  success = true,
  message = 'Success',
  data = null as any,
  meta,
  error,
}: ApiResponseOptions<T>) => {
  return res.status(statusCode).json({
    success,
    message,
    ...(data !== null && { data }),
    ...(meta && { meta }),
    ...(error && { error }),
    timestamp: new Date().toISOString(),
  });
};
