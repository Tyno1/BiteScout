import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import type { User } from "shared/types/api/schemas";
import type { LoginPostRequest } from "shared/types/auth/login";
import type { RegisterPostRequest } from "shared/types/auth/register";
import type { ApiError } from "shared/types/common/errors";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import apiClient from "../lib/axios";
import { tokenManager } from "../lib/tokenManager";
import { handleApiError } from "../utils/handleApiError";

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      refreshToken: null,
      expiresIn: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,

      // Actions
      login: async (userData: LoginPostRequest) => {
        set({ isLoading: true, error: null });

        try {
          const response = await apiClient.post('/auth/login', userData);          
          
          // Sync tokens with token manager
          await tokenManager.setTokens({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
          });
          
          set({
            user: response.data.user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          if (axios.isAxiosError(error) && error.response?.data) {
            const errorMessage = handleApiError(error);
            set({
              isLoading: false,
              error: errorMessage,
            });
          } else {
            set({
              isLoading: false,
              error: error instanceof Error ? error.message : "Login failed",
            });
          }
          throw error;
        }
      },

      register: async (userData: RegisterPostRequest) => {
        set({ isLoading: true, error: null });

        try {
          const response = await apiClient.post('/auth/register', userData);
          
          // Sync tokens with token manager
          await tokenManager.setTokens({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
          });
          
          set({
            user: response.data.user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          if (axios.isAxiosError(error) && error.response?.data) {
            const errorMessage = handleApiError(error);
            set({
              isLoading: false,
              error: errorMessage,
            });
          } else {
            set({
              isLoading: false,
              error: error instanceof Error ? error.message : "Registration failed",
            });
          }
          throw error;
        }
      },

      logout: async () => {
        // Clear tokens from token manager
        await tokenManager.clearTokens();
        
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
        const { refreshToken } = get();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        try {
          const response = await apiClient.post('/auth/refresh', {
            refreshToken,
          });
          
          // Sync tokens with token manager
          await tokenManager.setTokens({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
          });
          
          set({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
            error: null,
          });
        } catch (error: unknown) {
          await get().logout();
          throw error;
        }
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
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // Persist authentication data, not loading states
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        expiresIn: state.expiresIn,
        isAuthenticated: state.isAuthenticated,
      }),
      // Add version to handle migrations
      version: 1,
    }
  )
);

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


