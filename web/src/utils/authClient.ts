"use server";

import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getSession } from "next-auth/react";
import { cookies } from "next/headers";

const BACKEND_API = process.env.BACKEND_URL;

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
    console.log(session);

    // If session exists and has a token, add it to the request
    if (session?.user) {
      // Adjust this based on where your token is stored in the session

      const cookieStore = await cookies();
      const jwtCookie = cookieStore.get("next-auth.session-token")?.value;

      console.log("Raw JWT:", jwtCookie);

      const token = session.accessToken;
      console.log(token);

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
    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401) {
      // You could trigger a session refresh here if needed
      console.error("Authentication error:", error);
      // Optionally redirect to login
      // window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default apiClient;
