import { Router } from 'express';
import {
  getDashboardAnalytics,
  getThreatAnalytics,
  getDepartmentAnalytics,
  getAssetAnalytics,
  getAIAnalytics,
} from '../controllers/analyticsController';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateJWT);

router.get('/dashboard', getDashboardAnalytics);
router.get('/threats', getThreatAnalytics);
router.get('/departments', getDepartmentAnalytics);
router.get('/assets', getAssetAnalytics);
router.get('/ai', getAIAnalytics);

export default router;
