import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { sendApiResponse } from '../utils/apiResponse';

export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendApiResponse({
        res,
        statusCode: 401,
        success: false,
        message: 'Authentication context missing.',
        error: { code: 'UNAUTHORIZED' },
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendApiResponse({
        res,
        statusCode: 403,
        success: false,
        message: `Forbidden. Role '${req.user.role}' lacks required permissions.`,
        error: { code: 'FORBIDDEN', requiredRoles: allowedRoles },
      });
    }

    return next();
  };
};
