import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export interface JwtUserPayload {
  id: string;
  email: string;
  role: string;
}

export const generateAccessToken = (payload: JwtUserPayload): string => {
  return jwt.sign(payload, ENV.JWT_SECRET || 'placeholder_secret', {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (payload: JwtUserPayload): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'placeholder_refresh_secret', {
    expiresIn: '7d',
  });
};

export const verifyAccessToken = (token: string): JwtUserPayload => {
  return jwt.verify(token, ENV.JWT_SECRET || 'placeholder_secret') as JwtUserPayload;
};

export const verifyRefreshToken = (token: string): JwtUserPayload => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'placeholder_refresh_secret') as JwtUserPayload;
};
