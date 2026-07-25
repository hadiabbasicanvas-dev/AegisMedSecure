import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './apiClient';

export interface IncidentTimelineItem {
  id: string;
  incidentId: string;
  title: string;
  description: string;
  actor: string;
  timestamp: string;
}

export interface IncidentNoteItem {
  id: string;
  incidentId: string;
  authorName: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IncidentEvidenceItem {
  id: string;
  incidentId: string;
  fileName: string;
  fileType: 'SCREENSHOT' | 'LOG_FILE' | 'PDF_DOCUMENT' | 'IMAGE' | 'NETWORK_CAPTURE';
  fileSize: string;
  fileUrl: string;
  description: string;
  uploadedBy: string;
  createdAt: string;
}

export interface IncidentActionItem {
  id: string;
  incidentId: string;
  actionType: 'VLAN_ISOLATION' | 'MALWARE_REMOVAL' | 'PASSWORD_RESET' | 'ACCOUNT_LOCK' | 'FIREWALL_RULE' | 'DEVICE_SCAN' | 'PATCH_APPLIED';
  actionName: string;
  performedBy: string;
  resultStatus: 'SUCCESS' | 'PENDING' | 'FAILED';
  comments?: string;
  createdAt: string;
}

export interface IncidentItem {
  id: string;
  incidentCode: string;
  title: string;
  description: string;
  category: 'RANSOMWARE_CONTAINMENT' | 'DATA_EXFILTRATION_BREACH' | 'EMR_UNAUTHORIZED_ACCESS' | 'PACS_IMAGE_ENCRYPTION' | 'IOMT_MALWARE_INFECTION' | 'NETWORK_BRUTE_FORCE' | 'PHISHING_EXPLOIT';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  priority: 'P1_CRITICAL' | 'P2_HIGH' | 'P3_MEDIUM' | 'P4_LOW';
  status: 'NEW' | 'ASSIGNED' | 'INVESTIGATING' | 'CONTAINED' | 'ERADICATED' | 'RECOVERED' | 'CLOSED';
  sourceSystem: string;
  departmentName: string;
  affectedAsset: string;
  sourceIp: string;
  destinationIp: string;
  threatId?: string;
  assignedToId?: string;
  assignedToName?: string;
  secondaryAnalystName?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  timelineEvents: IncidentTimelineItem[];
  notes: IncidentNoteItem[];
  evidenceItems: IncidentEvidenceItem[];
  responseActions: IncidentActionItem[];
}

export interface FetchIncidentsParams {
  page?: number;
  limit?: number;
  search?: string;
  severity?: string;
  priority?: string;
  status?: string;
  category?: string;
  department?: string;
}

export const fetchIncidents = async (params: FetchIncidentsParams) => {
  const response = await apiClient.get('/incidents', { params });
  return response.data;
};

export const fetchIncidentDetail = async (id: string): Promise<IncidentItem> => {
  const response = await apiClient.get(`/incidents/${id}`);
  return response.data.data;
};

export const createIncidentApi = async (data: Partial<IncidentItem>) => {
  const response = await apiClient.post('/incidents', data);
  return response.data.data;
};

export const updateIncidentStatusApi = async (data: { id: string; status: string }) => {
  const response = await apiClient.patch(`/incidents/${data.id}`, { status: data.status });
  return response.data;
};

export const assignIncidentApi = async (data: { id: string; analystId: string; analystName: string; secondaryAnalystName?: string }) => {
  const response = await apiClient.post(`/incidents/${data.id}/assign`, data);
  return response.data;
};

export const addIncidentNoteApi = async (data: { id: string; content: string; isPinned?: boolean }) => {
  const response = await apiClient.post(`/incidents/${data.id}/note`, data);
  return response.data.data;
};

export const addIncidentEvidenceApi = async (data: {
  id: string;
  fileName: string;
  fileType: string;
  fileSize?: string;
  description?: string;
}) => {
  const response = await apiClient.post(`/incidents/${data.id}/evidence`, data);
  return response.data.data;
};

export const addIncidentActionApi = async (data: {
  id: string;
  actionType: string;
  actionName: string;
  comments?: string;
}) => {
  const response = await apiClient.post(`/incidents/${data.id}/action`, data);
  return response.data.data;
};

export const closeIncidentApi = async (data: { id: string; closureNotes?: string }) => {
  const response = await apiClient.post(`/incidents/${data.id}/close`, data);
  return response.data;
};

// React Query Hooks
export const useIncidents = (params: FetchIncidentsParams) => {
  return useQuery({
    queryKey: ['incidents', params],
    queryFn: () => fetchIncidents(params),
  });
};

export const useIncidentDetail = (id: string) => {
  return useQuery({
    queryKey: ['incident', id],
    queryFn: () => fetchIncidentDetail(id),
    enabled: !!id,
  });
};

export const useCreateIncident = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createIncidentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      queryClient.invalidateQueries({ queryKey: ['threats'] });
    },
  });
};

export const useUpdateIncidentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateIncidentStatusApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      queryClient.invalidateQueries({ queryKey: ['incident', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['threats'] });
      queryClient.invalidateQueries({ queryKey: ['threat'] });
    },
  });
};

export const useAssignIncident = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignIncidentApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      queryClient.invalidateQueries({ queryKey: ['incident', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['threats'] });
    },
  });
};

export const useAddIncidentNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addIncidentNoteApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['incident', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['threats'] });
    },
  });
};

export const useAddIncidentEvidence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addIncidentEvidenceApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['incident', variables.id] });
    },
  });
};

export const useAddIncidentAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addIncidentActionApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['incident', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['threats'] });
    },
  });
};

export const useCloseIncident = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: closeIncidentApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      queryClient.invalidateQueries({ queryKey: ['incident', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['threats'] });
      queryClient.invalidateQueries({ queryKey: ['threat'] });
    },
  });
};
