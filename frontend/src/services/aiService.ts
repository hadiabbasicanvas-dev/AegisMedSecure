import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './apiClient';

export interface StructuredDataPayload {
  executiveSummary: string;
  riskScore: number;
  riskClassification: string;
  playbookSteps: string[];
  affectedAssets: string[];
}

export interface MessageItem {
  id: string;
  conversationId: string;
  role: 'USER' | 'ASSISTANT' | 'SYSTEM';
  content: string;
  structuredData?: StructuredDataPayload;
  createdAt: string;
}

export interface ConversationItem {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  messages: MessageItem[];
}

export const fetchConversations = async (): Promise<ConversationItem[]> => {
  const response = await apiClient.get('/ai/conversations');
  return response.data.data;
};

export const fetchConversationDetail = async (id: string): Promise<ConversationItem> => {
  const response = await apiClient.get(`/ai/conversations/${id}`);
  return response.data.data;
};

export const sendChatMessageApi = async (data: { prompt: string; conversationId?: string; threatId?: string }) => {
  const response = await apiClient.post('/ai/chat', data);
  return response.data.data;
};

export const explainThreatAIApi = async (data: { threatId: string; conversationId?: string }) => {
  const response = await apiClient.post('/ai/explain-threat', data);
  return response.data.data;
};

export const recommendActionsAIApi = async (data: { threatId?: string; conversationId?: string }) => {
  const response = await apiClient.post('/ai/recommend-actions', data);
  return response.data.data;
};

export const renameConversationApi = async (data: { id: string; title: string }) => {
  const response = await apiClient.patch(`/ai/conversations/${data.id}`, { title: data.title });
  return response.data.data;
};

export const deleteConversationApi = async (id: string) => {
  const response = await apiClient.delete(`/ai/conversations/${id}`);
  return response.data;
};

// React Query Hooks
export const useConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
  });
};

export const useConversationDetail = (id: string) => {
  return useQuery({
    queryKey: ['conversation', id],
    queryFn: () => fetchConversationDetail(id),
    enabled: !!id,
  });
};

export const useSendChatMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendChatMessageApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['conversation', data.conversationId] });
    },
  });
};

export const useRenameConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: renameConversationApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['conversation', variables.id] });
    },
  });
};

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteConversationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};
