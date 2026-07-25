import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, JwtUserPayload } from '../utils/token';
import { sendApiResponse } from '../utils/apiResponse';

export interface AuthenticatedRequest extends Request {
  user?: JwtUserPayload;
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return sendApiResponse({
        res,
        statusCode: 401,
        success: false,
        message: 'Authentication required. No token provided.',
        error: { code: 'UNAUTHORIZED' },
      });
    }

    const payload = verifyAccessToken(token);
    req.user = payload;
    return next();
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 401,
      success: false,
      message: 'Invalid or expired access token.',
      error: { code: 'TOKEN_EXPIRED', details: error.message },
    });
  }
};
