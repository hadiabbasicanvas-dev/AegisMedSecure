import { useQuery } from '@tanstack/react-query';
import { apiClient } from './apiClient';

export interface AnalyticsSummaryData {
  securityScore: number;
  totalThreats: number;
  criticalThreats: number;
  activeAlerts: number;
  openIncidents: number;
  mttrLatencyMs: number;
  protectedAssetsCount: number;
  aiPrecisionScore: number;
  departmentRiskIndex: number;
}

export interface TimeSeriesTrendItem {
  timestamp: string;
  attacks: number;
  mitigations: number;
  critical: number;
  high: number;
  medium: number;
}

export interface DepartmentRiskItem {
  department: string;
  riskScore: number;
  activeThreats: number;
  protectedAssets: number;
  status: 'OPTIMAL' | 'ELEVATED' | 'HIGH' | 'CRITICAL';
}

export interface AssetDistributionItem {
  category: string;
  count: number;
  onlineCount: number;
  healthScore: number;
}

export interface ResolutionTrendItem {
  date: string;
  mttrMinutes: number;
  targetMinutes: number;
}

export const fetchDashboardAnalytics = async (range: string): Promise<AnalyticsSummaryData> => {
  const response = await apiClient.get('/analytics/dashboard', { params: { range } });
  return response.data.data;
};

export const fetchThreatAnalytics = async (range: string): Promise<TimeSeriesTrendItem[]> => {
  const response = await apiClient.get('/analytics/threats', { params: { range } });
  return response.data.data;
};

export const fetchDepartmentAnalytics = async (): Promise<DepartmentRiskItem[]> => {
  const response = await apiClient.get('/analytics/departments');
  return response.data.data;
};

export const fetchAssetAnalytics = async (): Promise<AssetDistributionItem[]> => {
  const response = await apiClient.get('/analytics/assets');
  return response.data.data;
};

export const fetchAIAnalytics = async (): Promise<ResolutionTrendItem[]> => {
  const response = await apiClient.get('/analytics/ai');
  return response.data.data;
};

// React Query Hooks
export const useDashboardAnalytics = (range: string) => {
  return useQuery({
    queryKey: ['analytics-dashboard', range],
    queryFn: () => fetchDashboardAnalytics(range),
  });
};

export const useThreatAnalytics = (range: string) => {
  return useQuery({
    queryKey: ['analytics-threats', range],
    queryFn: () => fetchThreatAnalytics(range),
  });
};

export const useDepartmentAnalytics = () => {
  return useQuery({
    queryKey: ['analytics-departments'],
    queryFn: fetchDepartmentAnalytics,
  });
};

export const useAssetAnalytics = () => {
  return useQuery({
    queryKey: ['analytics-assets'],
    queryFn: fetchAssetAnalytics,
  });
};

export const useAIAnalytics = () => {
  return useQuery({
    queryKey: ['analytics-ai'],
    queryFn: fetchAIAnalytics,
  });
};
