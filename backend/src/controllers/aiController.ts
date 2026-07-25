import { Request, Response } from 'express';
import { sendApiResponse } from '../utils/apiResponse';
import { AIEngineService } from '../services/ai/aiEngine.service';
import { conversationStore } from '../services/ai/conversationStore';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export const handleChat = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { prompt, conversationId, threatId } = req.body;
    const userId = req.user?.id || 'usr-analyst-01';

    if (!prompt) {
      return sendApiResponse({
        res,
        statusCode: 400,
        success: false,
        message: 'Prompt text is required.',
      });
    }

    const result = await AIEngineService.processChat(userId, prompt, conversationId, threatId);

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'AI Copilot response generated successfully.',
      data: result,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to process AI chat request.',
      error: { details: error.message },
    });
  }
};

export const explainThreat = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { threatId, conversationId } = req.body;
    const userId = req.user?.id || 'usr-analyst-01';

    if (!threatId) {
      return sendApiResponse({
        res,
        statusCode: 400,
        success: false,
        message: 'threatId parameter is required.',
      });
    }

    const prompt = `Perform a comprehensive technical breakdown and forensic analysis for threat ID ${threatId}. Include MITRE ATT&CK mapping and recommended SOAR playbooks.`;
    const result = await AIEngineService.processChat(userId, prompt, conversationId, threatId);

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Threat explanation generated.',
      data: result,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to generate threat explanation.',
      error: { details: error.message },
    });
  }
};

export const recommendActions = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { threatId, conversationId } = req.body;
    const userId = req.user?.id || 'usr-analyst-01';

    const prompt = threatId
      ? `Generate step-by-step SOAR containment playbooks and patient safety safeguards for threat ${threatId}.`
      : 'Provide general SOAR micro-segmentation playbooks for hospital EMR and PACS subnets.';

    const result = await AIEngineService.processChat(userId, prompt, conversationId, threatId);

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Recommended SOAR playbooks generated.',
      data: result,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to generate recommendations.',
      error: { details: error.message },
    });
  }
};

export const getConversations = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'usr-analyst-01';
    const conversations = await conversationStore.getConversationsForUser(userId);

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Conversations retrieved successfully.',
      data: conversations,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to fetch conversations.',
      error: { details: error.message },
    });
  }
};

export const getConversationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const conversation = await conversationStore.getConversationById(id);

    if (!conversation) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Conversation not found.',
      });
    }

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Conversation messages retrieved.',
      data: conversation,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to fetch conversation details.',
      error: { details: error.message },
    });
  }
};

export const renameConversation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return sendApiResponse({
        res,
        statusCode: 400,
        success: false,
        message: 'Title is required.',
      });
    }

    const updated = await conversationStore.renameConversation(id, title);
    if (!updated) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Conversation not found.',
      });
    }

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Conversation title updated.',
      data: updated,
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to rename conversation.',
      error: { details: error.message },
    });
  }
};

export const deleteConversation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await conversationStore.deleteConversation(id);

    if (!deleted) {
      return sendApiResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Conversation not found.',
      });
    }

    return sendApiResponse({
      res,
      statusCode: 200,
      message: 'Conversation history deleted.',
    });
  } catch (error: any) {
    return sendApiResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Failed to delete conversation.',
      error: { details: error.message },
    });
  }
};
