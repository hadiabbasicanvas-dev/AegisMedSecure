import { create } from 'zustand';
import { User } from '@/types/ui';
import { authService } from '@/services/authService';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  login: (credentials: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,

  setAccessToken: (token: string | null) =>
    set({ accessToken: token, isAuthenticated: !!token }),

  setUser: (user: User | null) => set({ user }),

  login: async (credentials: any) => {
    set({ isLoading: true });
    try {
      const data = await authService.login(credentials);
      set({
        user: data.user,
        accessToken: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (userData: any) => {
    set({ isLoading: true });
    try {
      const data = await authService.register(userData);
      set({
        user: data.user,
        accessToken: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
    } catch (e) {
      // Ignore errors on logout
    } finally {
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    // Timeout safety fallback (max 2 seconds)
    const timeout = setTimeout(() => {
      set((state) => (state.isCheckingAuth ? { isCheckingAuth: false } : {}));
    }, 2000);

    try {
      const data = await authService.refresh();
      clearTimeout(timeout);
      set({
        user: data.user,
        accessToken: data.token,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      clearTimeout(timeout);
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },
}));
