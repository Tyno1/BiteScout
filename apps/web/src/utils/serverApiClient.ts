import { getCurrentSession } from "@/app/actions/getSessionAction";
import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import config from "./config";

// Server-side API client for use in server actions
const serverApiClient: AxiosInstance = axios.create({
  baseURL: `${config.backend.server}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding the auth token
serverApiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get session from server action
      const session = await getCurrentSession();
      
      // If session exists and has a token, add it to the request
      if (session?.user?.accessToken) {
        const token = session.user.accessToken;
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error('Error getting session for server API client:', error);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
serverApiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      console.error("Server API client authentication error:", error);
    }
    
    return Promise.reject(error);
  }
);

export default serverApiClient; 