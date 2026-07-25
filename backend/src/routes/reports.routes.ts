import { Router } from 'express';
import {
  getReports,
  generateReport,
  downloadReport,
  deleteReport,
} from '../controllers/reportsController';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateJWT);

router.get('/', getReports);
router.post('/generate', generateReport);
router.get('/:id/download', downloadReport);
router.delete('/:id', deleteReport);

export default router;
