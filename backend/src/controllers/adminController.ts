import { Request, Response } from 'express';
import { sendApiResponse } from '../utils/apiResponse';
import { adminStore } from '../services/adminStore';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

// User Controllers
export const getUsersAdmin = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const role = req.query.role as string;
    const users = await adminStore.getUsers(search, role);

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'System user accounts retrieved.',
      data: users,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to fetch user accounts.',
      error: { details: error.message },
    });
  }
};

export const createUserAdmin = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userData = req.body;
    const newUser = await adminStore.createUser(userData);

    return sendApiResponse({
      res,
      statusCode: 201,
      message: 'New user account created successfully.',
      data: newUser,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to create user account.',
      error: { details: error.message },
    });
  }
};

export const updateUserAdmin = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await adminStore.updateUser(id, req.body);

    if (!updated) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'User not found.',
      });
    }

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'User account updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to update user account.',
      error: { details: error.message },
    });
  }
};

export const resetUserPasswordAdmin = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const tempPassword = `QihPass!${Math.floor(100 + Math.random() * 900)}`;

    return sendApiResponse({
      res,
      statusCode: 200,
      message: `Temporary password generated for user: ${tempPassword}`,
      data: { tempPassword },
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to reset user password.',
      error: { details: error.message },
    });
  }
};

// Asset Controllers
export const getAssetsAdmin = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const type = req.query.type as string;
    const risk = req.query.risk as string;
    const assets = await adminStore.getAssets(search, type, risk);

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Hospital asset inventory retrieved.',
      data: assets,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to fetch asset inventory.',
      error: { details: error.message },
    });
  }
};

export const createAssetAdmin = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const newAsset = await adminStore.createAsset(req.body);

    return sendApiResponse({
      res,
      statusCode: 201,
      message: 'Hospital asset registered successfully.',
      data: newAsset,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to register asset.',
      error: { details: error.message },
    });
  }
};

// Audit Logs Controller
export const getAuditLogsAdmin = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const logs = await adminStore.getAuditLogs(search);

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Security audit trail retrieved.',
      data: logs,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to fetch audit logs.',
      error: { details: error.message },
    });
  }
};

// System Health Controller
export const getSystemHealthAdmin = async (req: Request, res: Response) => {
  try {
    const health = await adminStore.getSystemHealth();

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'System infrastructure health metrics retrieved.',
      data: health,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to fetch system health.',
      error: { details: error.message },
    });
  }
};

// Settings Controller
export const getSettingsAdmin = async (req: Request, res: Response) => {
  try {
    const settings = await adminStore.getSettings();

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Global platform settings retrieved.',
      data: settings,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to fetch settings.',
      error: { details: error.message },
    });
  }
};

export const updateSettingsAdmin = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const updated = await adminStore.updateSettings(req.body);

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Global settings updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to update settings.',
      error: { details: error.message },
    });
  }
};
