import { Request, Response } from 'express';

export const getHealthStatus = (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    status: 'UP',
    service: 'Aegis Guardian AI Engine',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
};
