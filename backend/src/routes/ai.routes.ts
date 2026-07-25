import { Router } from 'express';
import {
  handleChat,
  explainThreat,
  recommendActions,
  getConversations,
  getConversationById,
  renameConversation,
  deleteConversation,
} from '../controllers/aiController';
import { authenticateJWT } from '../middlewares/auth.middleware';
import rateLimit from 'express-rate-limit';

const router = Router();

// AI Query Rate Limiter (Max 30 queries per 15 minutes per IP)
const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: 'AI Copilot query limit reached. Please wait before sending more prompts.',
  },
});

router.use(authenticateJWT);

router.post('/chat', aiRateLimiter, handleChat);
router.post('/explain-threat', aiRateLimiter, explainThreat);
router.post('/recommend-actions', aiRateLimiter, recommendActions);

router.get('/conversations', getConversations);
router.get('/conversations/:id', getConversationById);
router.patch('/conversations/:id', renameConversation);
router.delete('/conversations/:id', deleteConversation);

export default router;
