import { Router } from 'express';
import {
  getThreats,
  getThreatById,
  updateThreatStatus,
  assignThreat,
  escalateThreat,
  createIncidentFromThreat,
  exportThreatsCsv,
} from '../controllers/threatController';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/rbac.middleware';

const router = Router();

// Read Access (All Authenticated Operator Roles)
router.get('/', authenticateJWT, getThreats);
router.get('/export', authenticateJWT, exportThreatsCsv);
router.get('/:id', authenticateJWT, getThreatById);

// Analyst & Manager Status Actions
router.patch(
  '/:id',
  authenticateJWT,
  requireRole('SECURITY_ANALYST', 'SOC_MANAGER', 'SUPER_ADMINISTRATOR'),
  updateThreatStatus
);

router.post(
  '/:id/escalate',
  authenticateJWT,
  requireRole('SECURITY_ANALYST', 'SOC_MANAGER', 'SUPER_ADMINISTRATOR'),
  escalateThreat
);

router.post(
  '/:id/create-incident',
  authenticateJWT,
  requireRole('SECURITY_ANALYST', 'SOC_MANAGER', 'SUPER_ADMINISTRATOR'),
  createIncidentFromThreat
);

// Manager & Super Admin Assignment Action
router.post(
  '/:id/assign',
  authenticateJWT,
  requireRole('SOC_MANAGER', 'SUPER_ADMINISTRATOR'),
  assignThreat
);

export default router;
