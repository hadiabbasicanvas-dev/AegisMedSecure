import { Request, Response } from 'express';
import { sendApiResponse } from '../utils/apiResponse';
import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/token';
import { authStore, UserRecord } from '../services/authStore';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, department, role } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return sendApiResponse({
        res,
        statusCode: 400,
        success: false,
        message: 'Email, password, firstName, and lastName are required fields.',
        error: { code: 'INVALID_INPUT' },
      });
    }

    const existingUser = await authStore.findByEmail(email);
    if (existingUser) {
      return sendApiResponse({
        res,
        statusCode: 409,
        success: false,
        message: 'An operator account with this email address already exists.',
        error: { code: 'USER_ALREADY_EXISTS' },
      });
    }

    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();
    const newUser: UserRecord = {
      id: `usr-${Date.now()}`,
      email,
      passwordHash,
      firstName,
      lastName,
      department: department || 'Clinical IT',
      role: role || 'SECURITY_ANALYST',
      isEmailVerified: false,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    await authStore.createUser(newUser);

    const tokenPayload = { id: newUser.id, email: newUser.email, role: newUser.role };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    await authStore.saveRefreshToken(refreshToken);
    setRefreshTokenCookie(res, refreshToken);

    const verifyToken = `vfy-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    await authStore.createVerifyToken(newUser.id, verifyToken);

    const { passwordHash: _, ...userSafe } = newUser;

    return sendApiResponse({
      res,
      statusCode: 201,
      message: 'Operator account successfully registered.',
      data: {
        token: accessToken,
        user: userSafe,
        simulatedVerifyLink: `${process.env.CLIENT_URL || 'http://localhost:5173'}/verify-email?token=${verifyToken}`,
      },
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Registration failed.',
      error: { details: error.message },
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendApiResponse({
        res,
        statusCode: 400,
        success: false,
        message: 'Email and password are required.',
        error: { code: 'INVALID_INPUT' },
      });
    }

    const user = await authStore.findByEmail(email);
    if (!user) {
      return sendApiResponse({
        res,
        statusCode: 401,
        success: false,
        message: 'Invalid credentials provided.',
        error: { code: 'INVALID_CREDENTIALS' },
      });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return sendApiResponse({
        res,
        statusCode: 401,
        success: false,
        message: 'Invalid credentials provided.',
        error: { code: 'INVALID_CREDENTIALS' },
      });
    }

    if (!user.isActive) {
      return sendApiResponse({
        res,
        statusCode: 403,
        success: false,
        message: 'Account deactivated. Contact system administrator.',
        error: { code: 'ACCOUNT_DEACTIVATED' },
      });
    }

    const tokenPayload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    await authStore.saveRefreshToken(refreshToken);
    setRefreshTokenCookie(res, refreshToken);

    const { passwordHash: _, ...userSafe } = user;

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Authentication successful.',
      data: {
        token: accessToken,
        user: userSafe,
      },
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Login failed.',
      error: { details: error.message },
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const currentRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!currentRefreshToken) {
      return sendApiResponse({
        res,
        statusCode: 401,
        success: false,
        message: 'Refresh token not found.',
        error: { code: 'NO_REFRESH_TOKEN' },
      });
    }

    const isValid = await authStore.isRefreshTokenValid(currentRefreshToken);
    if (!isValid) {
      return sendApiResponse({
        res,
        statusCode: 401,
        success: false,
        message: 'Invalid or revoked refresh token.',
        error: { code: 'TOKEN_REVOKED' },
      });
    }

    const payload = verifyRefreshToken(currentRefreshToken);
    const user = await authStore.findById(payload.id);
    if (!user || !user.isActive) {
      return sendApiResponse({
        res,
        statusCode: 401,
        success: false,
        message: 'User session no longer active.',
        error: { code: 'USER_INACTIVE' },
      });
    }

    await authStore.revokeRefreshToken(currentRefreshToken);

    const newPayload = { id: user.id, email: user.email, role: user.role };
    const newAccessToken = generateAccessToken(newPayload);
    const newRefreshToken = generateRefreshToken(newPayload);

    await authStore.saveRefreshToken(newRefreshToken);
    setRefreshTokenCookie(res, newRefreshToken);

    const { passwordHash: _, ...userSafe } = user;

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Token rotated successfully.',
      data: {
        token: newAccessToken,
        user: userSafe,
      },
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 401,
      success: false,
      message: 'Refresh token invalid or expired.',
      error: { details: error.message },
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  const currentRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
  if (currentRefreshToken) {
    await authStore.revokeRefreshToken(currentRefreshToken);
  }
  res.clearCookie('refreshToken');

  return sendApiResponse({
    res,
    statusCode: 200,
    message: 'Logged out successfully.',
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return sendApiResponse({ res, statusCode: 400, success: false, message: 'Email is required.' });
  }

  const user = await authStore.findByEmail(email);
  if (!user) {
    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'If the email exists, a password reset link has been generated.',
    });
  }

  const resetToken = `rst-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  await authStore.createResetToken(user.id, resetToken);

  return sendApiResponse({
    res,
    statusCode: 200,
    message: 'If the email exists, a password reset link has been generated.',
    data: {
      simulatedResetLink: `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`,
    },
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return sendApiResponse({ res, statusCode: 400, success: false, message: 'Token and newPassword are required.' });
  }

  const resetRecord = await authStore.getResetToken(token);
  if (!resetRecord) {
    return sendApiResponse({
      res,
      statusCode: 400,
      success: false,
      message: 'Invalid or expired password reset token.',
      error: { code: 'INVALID_RESET_TOKEN' },
    });
  }

  const newHash = await hashPassword(newPassword);
  await authStore.updateUser(resetRecord.userId, { passwordHash: newHash });
  await authStore.deleteResetToken(token);

  return sendApiResponse({
    res,
    statusCode: 200,
    message: 'Password successfully reset.',
  });
};

export const changePassword = async (req: AuthenticatedRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!req.user || !currentPassword || !newPassword) {
    return sendApiResponse({
      res,
      statusCode: 400,
      success: false,
      message: 'currentPassword and newPassword are required.',
    });
  }

  const user = await authStore.findById(req.user.id);
  if (!user) {
    return sendApiResponse({ res, statusCode: 404, success: false, message: 'User not found.' });
  }

  const isMatch = await comparePassword(currentPassword, user.passwordHash);
  if (!isMatch) {
    return sendApiResponse({
      res,
      statusCode: 401,
      success: false,
      message: 'Current password provided is incorrect.',
    });
  }

  const newHash = await hashPassword(newPassword);
  await authStore.updateUser(user.id, { passwordHash: newHash });

  return sendApiResponse({
    res,
    statusCode: 200,
    message: 'Password successfully changed.',
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    return sendApiResponse({ res, statusCode: 400, success: false, message: 'Token is required.' });
  }

  const record = await authStore.getVerifyToken(token);
  if (!record) {
    return sendApiResponse({
      res,
      statusCode: 400,
      success: false,
      message: 'Invalid or expired verification token.',
    });
  }

  await authStore.updateUser(record.userId, { isEmailVerified: true });
  await authStore.deleteVerifyToken(token);

  return sendApiResponse({
    res,
    statusCode: 200,
    message: 'Email address verified successfully.',
  });
};
