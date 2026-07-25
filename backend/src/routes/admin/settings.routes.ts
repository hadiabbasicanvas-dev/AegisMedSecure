import { Router } from 'express';
import { getSettingsAdmin, updateSettingsAdmin } from '../../controllers/adminController';
import { authenticateJWT } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/rbac.middleware';

const router = Router();

router.get('/', authenticateJWT, getSettingsAdmin);
router.patch('/', authenticateJWT, requireRole('SUPER_ADMINISTRATOR', 'SOC_MANAGER'), updateSettingsAdmin);

export default router;
