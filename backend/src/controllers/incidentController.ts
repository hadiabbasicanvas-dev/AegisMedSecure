import { Request, Response } from 'express';
import { sendApiResponse } from '../utils/apiResponse';
import { incidentStore } from '../services/incidentStore';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export const getIncidents = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const severity = req.query.severity as string;
    const priority = req.query.priority as string;
    const status = req.query.status as string;
    const category = req.query.category as string;
    const department = req.query.department as string;

    const result = await incidentStore.getAll({ page, limit, search, severity, priority, status, category, department });

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Incident records retrieved successfully.',
      data: result.incidents,
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
      message: 'Failed to fetch incident records.',
      error: { details: error.message },
    });
  }
};

export const getIncidentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const incident = await incidentStore.getById(id);

    if (!incident) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Incident record not found.',
      });
    }

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Incident details retrieved.',
      data: incident,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to fetch incident details.',
      error: { details: error.message },
    });
  }
};

export const createIncident = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const actor = req.user ? `${req.user.email} (${req.user.role})` : 'Security Analyst';
    const incidentData = { ...req.body, createdBy: actor };

    const newInc = await incidentStore.create(incidentData);

    return sendApiResponse({
      res,
      statusCode: 201,
      message: 'Incident record initialized successfully.',
      data: newInc,
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

export const updateIncidentStatus = async (req: AuthenticatedRequest, res: Response) => {
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

    const updated = await incidentStore.updateStatus(id, status as any, actor);
    if (!updated) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Incident record not found.',
      });
    }

    return sendApiResponse({
      res,
      statusCode: 200,
      message: `Incident lifecycle status updated to ${status}.`,
      data: updated,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 400,
      success: false,
      message: error.message || 'Failed to update incident status.',
      error: { details: error.message },
    });
  }
};

export const assignIncident = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { analystId, analystName, secondaryAnalystName } = req.body;
    const actor = req.user ? `${req.user.email} (${req.user.role})` : 'SOC Manager';

    if (!analystName) {
      return sendApiResponse({
        res,
        statusCode: 400,
        success: false,
        message: 'analystName parameter is required.',
      });
    }

    const updated = await incidentStore.assignAnalyst(id, analystId || 'usr-analyst-01', analystName, secondaryAnalystName, actor);
    if (!updated) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Incident record not found.',
      });
    }

    return sendApiResponse({
      res,
      statusCode: 200,
      message: `Incident assigned to ${analystName}.`,
      data: updated,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to assign incident.',
      error: { details: error.message },
    });
  }
};

export const addIncidentNote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { content, isPinned } = req.body;
    const authorName = req.user ? `${req.user.email} (${req.user.role})` : 'Security Analyst';

    if (!content) {
      return sendApiResponse({
        res,
        statusCode: 400,
        success: false,
        message: 'Note content is required.',
      });
    }

    const note = await incidentStore.addNote(id, authorName, content, isPinned || false);
    if (!note) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Incident record not found.',
      });
    }

    return sendApiResponse({
      res,
      statusCode: 201,
      message: 'Investigation note appended.',
      data: note,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to add note.',
      error: { details: error.message },
    });
  }
};

export const addIncidentEvidence = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { fileName, fileType, fileSize, description } = req.body;
    const uploadedBy = req.user ? `${req.user.email} (${req.user.role})` : 'Security Analyst';

    if (!fileName || !fileType) {
      return sendApiResponse({
        res,
        statusCode: 400,
        success: false,
        message: 'fileName and fileType are required.',
      });
    }

    const evidence = await incidentStore.addEvidence(
      id,
      fileName,
      fileType as any,
      fileSize || '2.4 MB',
      description || 'Forensic telemetry capture file',
      uploadedBy
    );

    if (!evidence) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Incident record not found.',
      });
    }

    return sendApiResponse({
      res,
      statusCode: 201,
      message: 'Forensic evidence item logged.',
      data: evidence,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to log evidence item.',
      error: { details: error.message },
    });
  }
};

export const addIncidentAction = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { actionType, actionName, comments } = req.body;
    const performedBy = req.user ? `${req.user.email} (${req.user.role})` : 'Aegis SOAR Engine';

    if (!actionType || !actionName) {
      return sendApiResponse({
        res,
        statusCode: 400,
        success: false,
        message: 'actionType and actionName are required.',
      });
    }

    const action = await incidentStore.addAction(id, actionType as any, actionName, performedBy, comments);
    if (!action) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Incident record not found.',
      });
    }

    return sendApiResponse({
      res,
      statusCode: 201,
      message: `Response action ${actionName} logged.`,
      data: action,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to record response action.',
      error: { details: error.message },
    });
  }
};

export const closeIncident = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { closureNotes } = req.body;
    const actor = req.user ? `${req.user.email} (${req.user.role})` : 'SOC Operator';

    if (closureNotes) {
      await incidentStore.addNote(id, actor, `[CLOSURE AUDIT] ${closureNotes}`, true);
    }

    const updated = await incidentStore.updateStatus(id, 'CLOSED', actor);
    if (!updated) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Incident record not found.',
      });
    }

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Incident successfully resolved & closed.',
      data: updated,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 400,
      success: false,
      message: error.message || 'Failed to close incident.',
      error: { details: error.message },
    });
  }
};

export const exportIncidentsCsv = async (req: Request, res: Response) => {
  try {
    const csvContent = await incidentStore.exportCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="aegis_incident_management_export.csv"');
    return res.status(200).send(csvContent);
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to generate incident CSV export.',
      error: { details: error.message },
    });
  }
};
