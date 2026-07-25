import { Response } from 'express';
import { sendApiResponse } from '../utils/apiResponse';
import { authStore } from '../services/authStore';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return sendApiResponse({ res, statusCode: 401, success: false, message: 'Unauthorized.' });
  }

  const user = await authStore.findById(req.user.id);
  if (!user) {
    return sendApiResponse({ res, statusCode: 404, success: false, message: 'User profile not found.' });
  }

  const { passwordHash: _, ...userSafe } = user;
  return sendApiResponse({
    res,
    statusCode: 200,
    message: 'Profile retrieved successfully.',
    data: { user: userSafe },
  });
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return sendApiResponse({ res, statusCode: 401, success: false, message: 'Unauthorized.' });
  }

  const { firstName, lastName, department } = req.body;

  const updatedUser = await authStore.updateUser(req.user.id, {
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(department && { department }),
  });

  if (!updatedUser) {
    return sendApiResponse({ res, statusCode: 404, success: false, message: 'User profile not found.' });
  }

  const { passwordHash: _, ...userSafe } = updatedUser;
  return sendApiResponse({
    res,
    statusCode: 200,
    message: 'Profile updated successfully.',
    data: { user: userSafe },
  });
};
