import { Request, Response } from 'express';
import { sendApiResponse } from '../utils/apiResponse';
import { threatStore } from '../services/threatStore';
import { incidentStore } from '../services/incidentStore';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export const getThreats = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const severity = req.query.severity as string;
    const status = req.query.status as string;
    const category = req.query.category as string;
    const department = req.query.department as string;

    const result = await threatStore.getAll({ page, limit, search, severity, status, category, department });

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Threat records retrieved successfully.',
      data: result.threats,
      meta: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to fetch threat records.',
      error: { details: error.message },
    });
  }
};

export const getThreatById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const threat = await threatStore.getById(id);

    if (!threat) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Threat record not found.',
      });
    }

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Threat record details retrieved.',
      data: threat,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Error fetching threat detail.',
      error: { details: error.message },
    });
  }
};

export const updateThreatStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const actor = req.user ? `${req.user.email} (${req.user.role})` : 'Analyst Operator';

    if (!status) {
      return sendApiResponse({
        res,
        statusCode: 400,
        success: false,
        message: 'Status parameter is required.',
      });
    }

    const updated = await threatStore.updateStatus(id, status, actor);
    if (!updated) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Threat record not found.',
      });
    }

    return sendApiResponse({
      res,
      statusCode: 200,
      message: `Threat status updated to ${status}.`,
      data: updated,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to update threat status.',
      error: { details: error.message },
    });
  }
};

export const assignThreat = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { analystId, analystName } = req.body;
    const actor = req.user ? `${req.user.email} (${req.user.role})` : 'SOC Manager';

    if (!analystName) {
      return sendApiResponse({
        res,
        statusCode: 400,
        success: false,
        message: 'analystName parameter is required.',
      });
    }

    const updated = await threatStore.assignAnalyst(id, analystId || 'usr-analyst-01', analystName, actor);
    if (!updated) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Threat record not found.',
      });
    }

    return sendApiResponse({
      res,
      statusCode: 200,
      message: `Threat assigned to ${analystName}.`,
      data: updated,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to assign threat.',
      error: { details: error.message },
    });
  }
};

export const escalateThreat = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { severity } = req.body;
    const actor = req.user ? `${req.user.email} (${req.user.role})` : 'SOC Manager';

    if (!severity) {
      return sendApiResponse({
        res,
        statusCode: 400,
        success: false,
        message: 'Severity parameter is required.',
      });
    }

    const updated = await threatStore.escalateSeverity(id, severity, actor);
    if (!updated) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Threat record not found.',
      });
    }

    return sendApiResponse({
      res,
      statusCode: 200,
      message: `Threat severity escalated to ${severity}.`,
      data: updated,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to escalate threat.',
      error: { details: error.message },
    });
  }
};

export const createIncidentFromThreat = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const actor = req.user ? `${req.user.email} (${req.user.role})` : 'Security Analyst';

    const threat = await threatStore.getById(id);
    if (!threat) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Threat record not found.',
      });
    }

    await threatStore.updateStatus(id, 'INVESTIGATING', actor);

    // Map Category
    let incidentCategory: any = 'RANSOMWARE_CONTAINMENT';
    if (threat.category === 'RANSOMWARE' || threat.category === 'MALWARE') {
      incidentCategory = 'RANSOMWARE_CONTAINMENT';
    } else if (threat.category === 'DATA_EXFILTRATION') {
      incidentCategory = 'DATA_EXFILTRATION_BREACH';
    } else if (threat.category === 'SQL_INJECTION' || threat.category === 'UNAUTHORIZED_ACCESS') {
      incidentCategory = 'EMR_UNAUTHORIZED_ACCESS';
    } else if (threat.category === 'SUSPICIOUS_USB') {
      incidentCategory = 'IOMT_MALWARE_INFECTION';
    } else if (threat.category === 'PHISHING') {
      incidentCategory = 'PHISHING_EXPLOIT';
    } else if (threat.category === 'BRUTE_FORCE' || threat.category === 'PORT_SCANNING') {
      incidentCategory = 'NETWORK_BRUTE_FORCE';
    }

    // Map Priority
    let priority: any = 'P2_HIGH';
    if (threat.severity === 'CRITICAL') priority = 'P1_CRITICAL';
    else if (threat.severity === 'HIGH') priority = 'P2_HIGH';
    else if (threat.severity === 'MEDIUM') priority = 'P3_MEDIUM';
    else priority = 'P4_LOW';

    const codeNum = Math.floor(100 + Math.random() * 900);
    const incidentCode = `INC-2026-${codeNum}`;

    const newIncident = await incidentStore.create({
      incidentCode,
      title: threat.name,
      description: `${threat.description} (AI Evaluation: ${threat.aiSummary || 'High priority incident converted from threat telemetry.'})`,
      category: incidentCategory,
      severity: (threat.severity === 'INFORMATIONAL' ? 'LOW' : threat.severity) as any,
      priority,
      sourceSystem: threat.sourceSystem,
      departmentName: threat.departmentName,
      affectedAsset: threat.affectedAsset,
      sourceIp: threat.sourceIp || '10.45.12.89',
      destinationIp: threat.destinationIp || '10.45.0.1',
      threatId: threat.id,
      assignedToId: threat.assignedToId || 'usr-analyst-01',
      assignedToName: threat.assignedToName || 'Zain Ahmed (Security Analyst)',
      createdBy: actor,
    });

    return sendApiResponse({
      res,
      statusCode: 201,
      message: `Incident ${newIncident.incidentCode} created successfully.`,
      data: newIncident,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to create incident record.',
      error: { details: error.message },
    });
  }
};

export const exportThreatsCsv = async (req: Request, res: Response) => {
  try {
    const csvContent = await threatStore.exportCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="aegis_threat_telemetry.csv"');
    return res.status(200).send(csvContent);
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to generate threat export CSV.',
      error: { details: error.message },
    });
  }
};
