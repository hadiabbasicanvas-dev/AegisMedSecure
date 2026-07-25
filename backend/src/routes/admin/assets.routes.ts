import { Router } from 'express';
import { getAssetsAdmin, createAssetAdmin } from '../../controllers/adminController';
import { authenticateJWT } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/rbac.middleware';

const router = Router();

router.get('/', authenticateJWT, getAssetsAdmin);
router.post('/', authenticateJWT, requireRole('SUPER_ADMINISTRATOR', 'IT_ADMINISTRATOR', 'SOC_MANAGER'), createAssetAdmin);

export default router;
