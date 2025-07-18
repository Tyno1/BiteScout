import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getSession } from "next-auth/react";
import refreshAccessToken from "./refreshAccessToken";

const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: BACKEND_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding the auth token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Get session from NextAuth
    const session = await getSession();

    // If session exists and has a token, add it to the request
    if (session?.user && session.user.accessToken) {
      const token = session.user.accessToken;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const session = await getSession();

    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401) {
      // You could trigger a session refresh here if needed
      console.error("Authentication error:", error);
      if (session?.user?.refreshToken) {
        await refreshAccessToken({ refreshToken: session.user.refreshToken });
      }
      // Optionally redirect to login
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
