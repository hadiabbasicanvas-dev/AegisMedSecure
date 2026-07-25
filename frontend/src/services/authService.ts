import { apiClient } from './apiClient';
import { User } from '@/types/ui';

export interface AuthResponse {
  token: string;
  user: User;
  simulatedVerifyLink?: string;
  simulatedResetLink?: string;
}

export const authService = {
  login: async (credentials: any): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data.data;
  },

  register: async (userData: any): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data.data;
  },

  refresh: async (): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/refresh');
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  getProfile: async (): Promise<{ user: User }> => {
    const response = await apiClient.get('/profile');
    return response.data.data;
  },

  updateProfile: async (data: { firstName?: string; lastName?: string; department?: string }): Promise<{ user: User }> => {
    const response = await apiClient.put('/profile', data);
    return response.data.data;
  },

  forgotPassword: async (email: string): Promise<{ message: string; simulatedResetLink?: string }> => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (data: { token: string; newPassword: string }): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/change-password', { currentPassword, newPassword });
    return response.data;
  },

  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/verify-email', { token });
    return response.data;
  },
};
