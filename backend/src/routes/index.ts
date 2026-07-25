import { Router } from 'express';
import healthRoutes from './healthRoutes';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';
import threatRoutes from './threatRoutes';
import aiRoutes from './ai.routes';
import analyticsRoutes from './analytics.routes';
import reportsRoutes from './reports.routes';
import incidentRoutes from './incidentRoutes';
import adminUsersRoutes from './admin/users.routes';
import adminAssetsRoutes from './admin/assets.routes';
import adminAuditRoutes from './admin/audit.routes';
import adminSettingsRoutes from './admin/settings.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/threats', threatRoutes);
router.use('/ai', aiRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/reports', reportsRoutes);
router.use('/incidents', incidentRoutes);

// Admin Routes
router.use('/admin/users', adminUsersRoutes);
router.use('/admin/assets', adminAssetsRoutes);
router.use('/admin', adminAuditRoutes);
router.use('/admin/settings', adminSettingsRoutes);

export default router;
