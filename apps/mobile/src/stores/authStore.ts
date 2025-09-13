import { create } from "zustand";

// Simple type definitions
type User = {
  id: string;
  name: string;
  email: string;
};

type LoginPostRequest = {
  email: string;
  password: string;
};

type RegisterPostRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  // Actions
  login: (userData: LoginPostRequest) => Promise<void>;
  register: (userData: RegisterPostRequest) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Initial state
  user: { id: '1', name: 'Test User', email: 'test@example.com' },
  accessToken: 'mock-token',
  refreshToken: 'mock-refresh-token',
  expiresIn: 3600,
  isLoading: false,
  isAuthenticated: true,
  error: null,

  // Actions
  login: async (userData: LoginPostRequest) => {
    set({ isLoading: true, error: null });
    // Simplified for now - just set a mock user
    set({
      user: { id: '1', name: 'Test User', email: userData.email },
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  },

  register: async (userData: RegisterPostRequest) => {
    set({ isLoading: true, error: null });
    // Simplified for now
    set({
      isLoading: false,
      error: null,
    });
  },

  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      expiresIn: null,
      isAuthenticated: false,
      error: null,
    });
  },

  refreshAccessToken: async () => {
    // Simplified for now
  },

  updateUser: (userData: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: { ...currentUser, ...userData },
        error: null,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));

// Individual selectors for better performance
export const useUser = () => useAuthStore((state) => state.user);
export const useAccessToken = () => useAuthStore((state) => state.accessToken);
export const useRefreshToken = () => useAuthStore((state) => state.refreshToken);
export const useExpiresIn = () => useAuthStore((state) => state.expiresIn);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);
export const useError = () => useAuthStore((state) => state.error);
export const useLogin = () => useAuthStore((state) => state.login);
export const useRegister = () => useAuthStore((state) => state.register);
export const useLogout = () => useAuthStore((state) => state.logout);
export const useRefreshAccessToken = () => useAuthStore((state) => state.refreshAccessToken);
export const useUpdateUser = () => useAuthStore((state) => state.updateUser);
export const useClearError = () => useAuthStore((state) => state.clearError);


