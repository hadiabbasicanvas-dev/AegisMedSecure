import { Request, Response } from 'express';
import { sendApiResponse } from '../utils/apiResponse';
import { analyticsStore } from '../services/analyticsStore';

export const getDashboardAnalytics = async (req: Request, res: Response) => {
  try {
    const range = (req.query.range as string) || '24h';
    const summary = await analyticsStore.getDashboardSummary(range);
    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Dashboard analytics summary retrieved.',
      data: summary,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to fetch dashboard analytics.',
      error: { details: error.message },
    });
  }
};

export const getThreatAnalytics = async (req: Request, res: Response) => {
  try {
    const range = (req.query.range as string) || '24h';
    const trends = await analyticsStore.getTimeSeriesTrends(range);
    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Threat time-series trends retrieved.',
      data: trends,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to fetch threat analytics.',
      error: { details: error.message },
    });
  }
};

export const getDepartmentAnalytics = async (req: Request, res: Response) => {
  try {
    const departments = await analyticsStore.getDepartmentRiskMatrix();
    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Department risk matrix retrieved.',
      data: departments,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to fetch department analytics.',
      error: { details: error.message },
    });
  }
};

export const getAssetAnalytics = async (req: Request, res: Response) => {
  try {
    const assets = await analyticsStore.getAssetDistributions();
    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Asset health distribution retrieved.',
      data: assets,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to fetch asset analytics.',
      error: { details: error.message },
    });
  }
};

export const getAIAnalytics = async (req: Request, res: Response) => {
  try {
    const resolutions = await analyticsStore.getResolutionTrends();
    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'AI performance & MTTR resolution trends retrieved.',
      data: resolutions,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to fetch AI analytics.',
      error: { details: error.message },
    });
  }
};
