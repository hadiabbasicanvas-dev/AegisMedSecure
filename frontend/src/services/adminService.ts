import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './apiClient';

export interface UserAdminItem {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  role: 'SUPER_ADMINISTRATOR' | 'SOC_MANAGER' | 'SECURITY_ANALYST' | 'IT_ADMINISTRATOR' | 'COMPLIANCE_OFFICER';
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AssetAdminItem {
  id: string;
  assetCode: string;
  name: string;
  type: 'SERVER' | 'WORKSTATION' | 'MEDICAL_DEVICE' | 'FIREWALL' | 'ROUTER' | 'SWITCH' | 'IMAGING_EQUIPMENT' | 'NETWORK_APPLIANCE';
  departmentName: string;
  ipAddress: string;
  macAddress: string;
  os: string;
  owner: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  isMonitored: boolean;
  lastScanAt: string;
  createdAt: string;
}

export interface AuditLogItem {
  id: string;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
  result: 'SUCCESS' | 'FAILURE';
  userName: string;
  createdAt: string;
}

export interface SystemHealthData {
  status: 'OPTIMAL' | 'DEGRADED' | 'CRITICAL';
  uptimeSeconds: number;
  cpuUsagePercent: number;
  memoryUsagePercent: number;
  databaseLatencyMs: number;
  activeSocketsCount: number;
  storageUsedGb: number;
  storageTotalGb: number;
}

// Fetchers
export const fetchAdminUsers = async (params?: { search?: string; role?: string }) => {
  const response = await apiClient.get('/admin/users', { params });
  return response.data.data;
};

export const createAdminUserApi = async (data: Partial<UserAdminItem>) => {
  const response = await apiClient.post('/admin/users', data);
  return response.data.data;
};

export const updateAdminUserApi = async (data: { id: string; updates: Partial<UserAdminItem> }) => {
  const response = await apiClient.patch(`/admin/users/${data.id}`, data.updates);
  return response.data.data;
};

export const resetAdminUserPasswordApi = async (id: string) => {
  const response = await apiClient.post(`/admin/users/${id}/reset-password`);
  return response.data.data;
};

export const fetchAdminAssets = async (params?: { search?: string; type?: string; risk?: string }) => {
  const response = await apiClient.get('/admin/assets', { params });
  return response.data.data;
};

export const createAdminAssetApi = async (data: Partial<AssetAdminItem>) => {
  const response = await apiClient.post('/admin/assets', data);
  return response.data.data;
};

export const fetchAdminAuditLogs = async (search?: string) => {
  const response = await apiClient.get('/admin/audit-logs', { params: { search } });
  return response.data.data;
};

export const fetchAdminSystemHealth = async (): Promise<SystemHealthData> => {
  const response = await apiClient.get('/admin/system-health');
  return response.data.data;
};

export const fetchAdminSettings = async () => {
  const response = await apiClient.get('/admin/settings');
  return response.data.data;
};

export const updateAdminSettingsApi = async (updates: Record<string, string>) => {
  const response = await apiClient.patch('/admin/settings', updates);
  return response.data.data;
};

// React Query Hooks
export const useAdminUsers = (params?: { search?: string; role?: string }) => {
  return useQuery({
    queryKey: ['admin-users', params],
    queryFn: () => fetchAdminUsers(params),
  });
};

export const useCreateAdminUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdminUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
};

export const useUpdateAdminUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdminUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
};

export const useResetAdminUserPassword = () => {
  return useMutation({
    mutationFn: resetAdminUserPasswordApi,
  });
};

export const useAdminAssets = (params?: { search?: string; type?: string; risk?: string }) => {
  return useQuery({
    queryKey: ['admin-assets', params],
    queryFn: () => fetchAdminAssets(params),
  });
};

export const useCreateAdminAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdminAssetApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-assets'] });
    },
  });
};

export const useAdminAuditLogs = (search?: string) => {
  return useQuery({
    queryKey: ['admin-audit-logs', search],
    queryFn: () => fetchAdminAuditLogs(search),
  });
};

export const useAdminSystemHealth = () => {
  return useQuery({
    queryKey: ['admin-system-health'],
    queryFn: fetchAdminSystemHealth,
    refetchInterval: 10000,
  });
};

export const useAdminSettings = () => {
  return useQuery({
    queryKey: ['admin-settings'],
    queryFn: fetchAdminSettings,
  });
};

export const useUpdateAdminSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdminSettingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
    },
  });
};
