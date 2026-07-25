import { Router } from 'express';
import {
  getIncidents,
  getIncidentById,
  createIncident,
  updateIncidentStatus,
  assignIncident,
  addIncidentNote,
  addIncidentEvidence,
  addIncidentAction,
  closeIncident,
  exportIncidentsCsv,
} from '../controllers/incidentController';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/rbac.middleware';

const router = Router();

// Read Access (All Authenticated Roles)
router.get('/', authenticateJWT, getIncidents);
router.get('/export', authenticateJWT, exportIncidentsCsv);
router.get('/:id', authenticateJWT, getIncidentById);

// Incident Modifications & Creation
router.post(
  '/',
  authenticateJWT,
  requireRole('SECURITY_ANALYST', 'SOC_MANAGER', 'SUPER_ADMINISTRATOR'),
  createIncident
);

router.patch(
  '/:id',
  authenticateJWT,
  requireRole('SECURITY_ANALYST', 'SOC_MANAGER', 'SUPER_ADMINISTRATOR'),
  updateIncidentStatus
);

router.post(
  '/:id/assign',
  authenticateJWT,
  requireRole('SECURITY_ANALYST', 'SOC_MANAGER', 'SUPER_ADMINISTRATOR'),
  assignIncident
);

router.post(
  '/:id/note',
  authenticateJWT,
  requireRole('SECURITY_ANALYST', 'SOC_MANAGER', 'SUPER_ADMINISTRATOR', 'COMPLIANCE_OFFICER'),
  addIncidentNote
);

router.post(
  '/:id/evidence',
  authenticateJWT,
  requireRole('SECURITY_ANALYST', 'SOC_MANAGER', 'SUPER_ADMINISTRATOR'),
  addIncidentEvidence
);

router.post(
  '/:id/action',
  authenticateJWT,
  requireRole('SECURITY_ANALYST', 'SOC_MANAGER', 'SUPER_ADMINISTRATOR'),
  addIncidentAction
);

router.post(
  '/:id/close',
  authenticateJWT,
  requireRole('SECURITY_ANALYST', 'SOC_MANAGER', 'SUPER_ADMINISTRATOR'),
  closeIncident
);

export default router;
