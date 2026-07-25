import { Router } from 'express';
import { getUsersAdmin, createUserAdmin, updateUserAdmin, resetUserPasswordAdmin } from '../../controllers/adminController';
import { authenticateJWT } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/rbac.middleware';

const router = Router();

router.get('/', authenticateJWT, requireRole('SUPER_ADMINISTRATOR', 'SOC_MANAGER', 'IT_ADMINISTRATOR'), getUsersAdmin);
router.post('/', authenticateJWT, requireRole('SUPER_ADMINISTRATOR'), createUserAdmin);
router.patch('/:id', authenticateJWT, requireRole('SUPER_ADMINISTRATOR'), updateUserAdmin);
router.post('/:id/reset-password', authenticateJWT, requireRole('SUPER_ADMINISTRATOR'), resetUserPasswordAdmin);

export default router;
