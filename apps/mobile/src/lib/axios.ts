import axios from 'axios';
import config from '../config/api';
import { tokenManager } from './tokenManager';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: `${config.backend.baseURL}/api`,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Routes that don't require authentication
const publicRoutes = ['/auth/login', '/auth/register', '/auth/refresh'];

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // Only add auth token for protected routes
    const isPublicRoute = publicRoutes.some(route => config.url?.includes(route));
    
    if (!isPublicRoute) {
      const token = await tokenManager.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const tokens = await tokenManager.getTokens();
        if (tokens.refreshToken) {
          const response = await axios.post(`${config.backend.baseURL}/api/auth/refresh`, {
            refreshToken: tokens.refreshToken,
          });
          
          // Update stored tokens
          await tokenManager.setTokens({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
          });
          
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        console.log('Token refresh failed, clearing tokens');
        await tokenManager.clearTokens();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
