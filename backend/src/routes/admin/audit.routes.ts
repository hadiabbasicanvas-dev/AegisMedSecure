import { Router } from 'express';
import { getAuditLogsAdmin, getSystemHealthAdmin } from '../../controllers/adminController';
import { authenticateJWT } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/rbac.middleware';

const router = Router();

router.get('/audit-logs', authenticateJWT, requireRole('SUPER_ADMINISTRATOR', 'SOC_MANAGER', 'COMPLIANCE_OFFICER', 'IT_ADMINISTRATOR'), getAuditLogsAdmin);
router.get('/system-health', authenticateJWT, requireRole('SUPER_ADMINISTRATOR', 'SOC_MANAGER', 'IT_ADMINISTRATOR'), getSystemHealthAdmin);

export default router;
