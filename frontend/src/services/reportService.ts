import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './apiClient';

export interface ReportItem {
  id: string;
  title: string;
  reportType: 'EXECUTIVE_SUMMARY' | 'THREAT_INTELLIGENCE' | 'INCIDENT_ANALYSIS' | 'DEPARTMENT_SECURITY' | 'ASSET_HEALTH' | 'AI_PERFORMANCE' | 'COMPLIANCE_AUDIT';
  format: 'PDF' | 'CSV' | 'JSON';
  fileUrl: string;
  filtersApplied: Record<string, any>;
  generatedById: string;
  generatedByName: string;
  createdAt: string;
}

export const fetchReports = async (): Promise<ReportItem[]> => {
  const response = await apiClient.get('/reports');
  return response.data.data;
};

export const generateReportApi = async (data: {
  title?: string;
  reportType: string;
  format: string;
  filtersApplied?: Record<string, any>;
}) => {
  const response = await apiClient.post('/reports/generate', data);
  return response.data.data;
};

export const deleteReportApi = async (id: string) => {
  const response = await apiClient.delete(`/reports/${id}`);
  return response.data;
};

// React Query Hooks
export const useReports = () => {
  return useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports,
  });
};

export const useGenerateReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: generateReportApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
};

export const useDeleteReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReportApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
};
