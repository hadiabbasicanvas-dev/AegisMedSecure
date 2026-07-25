import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './apiClient';

export interface ThreatTimelineEventItem {
  id: string;
  threatId: string;
  title: string;
  description: string;
  actor: string;
  timestamp: string;
}

export interface ThreatItem {
  id: string;
  threatCode: string;
  name: string;
  description: string;
  category: 'MALWARE' | 'RANSOMWARE' | 'SQL_INJECTION' | 'BRUTE_FORCE' | 'DDOS' | 'PHISHING' | 'INSIDER_THREAT' | 'UNAUTHORIZED_ACCESS' | 'PORT_SCANNING' | 'DATA_EXFILTRATION' | 'SUSPICIOUS_USB';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL';
  status: 'OPEN' | 'INVESTIGATING' | 'CONTAINED' | 'RESOLVED' | 'CLOSED';
  sourceSystem: string;
  departmentName: string;
  affectedAsset: string;
  sourceIp: string;
  destinationIp: string;
  aiConfidence: number;
  aiRiskScore: number;
  aiSummary: string;
  assignedToId?: string;
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
  timelineEvents: ThreatTimelineEventItem[];
}

export interface FetchThreatsParams {
  page?: number;
  limit?: number;
  search?: string;
  severity?: string;
  status?: string;
  category?: string;
  department?: string;
}

export const fetchThreats = async (params: FetchThreatsParams) => {
  const response = await apiClient.get('/threats', { params });
  return response.data;
};

export const fetchThreatDetail = async (id: string): Promise<ThreatItem> => {
  const response = await apiClient.get(`/threats/${id}`);
  return response.data.data;
};

export const updateThreatStatusApi = async (data: { id: string; status: string }) => {
  const response = await apiClient.patch(`/threats/${data.id}`, { status: data.status });
  return response.data;
};

export const assignThreatApi = async (data: { id: string; analystId: string; analystName: string }) => {
  const response = await apiClient.post(`/threats/${data.id}/assign`, { analystId: data.analystId, analystName: data.analystName });
  return response.data;
};

export const escalateThreatApi = async (data: { id: string; severity: string }) => {
  const response = await apiClient.post(`/threats/${data.id}/escalate`, { severity: data.severity });
  return response.data;
};

export const createIncidentFromThreatApi = async (id: string) => {
  const response = await apiClient.post(`/threats/${id}/create-incident`);
  return response.data;
};

// React Query Hooks
export const useThreats = (params: FetchThreatsParams) => {
  return useQuery({
    queryKey: ['threats', params],
    queryFn: () => fetchThreats(params),
  });
};

export const useThreatDetail = (id: string) => {
  return useQuery({
    queryKey: ['threat', id],
    queryFn: () => fetchThreatDetail(id),
    enabled: !!id,
  });
};

export const useUpdateThreatStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateThreatStatusApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['threats'] });
      queryClient.invalidateQueries({ queryKey: ['threat', variables.id] });
    },
  });
};

export const useAssignThreat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignThreatApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['threats'] });
      queryClient.invalidateQueries({ queryKey: ['threat', variables.id] });
    },
  });
};

export const useEscalateThreat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: escalateThreatApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['threats'] });
      queryClient.invalidateQueries({ queryKey: ['threat', variables.id] });
    },
  });
};

export const useCreateIncidentFromThreat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createIncidentFromThreatApi,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['threats'] });
      queryClient.invalidateQueries({ queryKey: ['threat', id] });
    },
  });
};
