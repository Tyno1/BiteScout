// Example: How to use the new standardized error handling

import type { ApiError } from "@shared/types/common/errors";

// NEW WAY (works with standardized error structure)
export const newApiCall = async () => {
  try {
    const response = await fetch('/api/restaurants');
    if (!response.ok) {
      const apiError = await response.json() as ApiError;
      
      // Handle specific error types
      switch (apiError.code) {
        case 'AUTHENTICATION_ERROR':
          console.log('Please log in again');
          window.location.href = '/login';
          return;
        case 'VALIDATION_ERROR':
          console.log('Please check your input');
          break;
        case 'RATE_LIMIT_EXCEEDED':
          console.log('Too many requests. Please try again later.');
          break;
        default:
          console.log('An error occurred:', apiError.message);
      }
    }
    return await response.json();
  } catch (error) {
    console.error('Network Error:', error);
  }
};

// Example: Login function with new error handling
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const apiError = await response.json() as ApiError;
      
      // Map error codes to user-friendly messages
      const errorMessages: Record<string, string> = {
        'AUTHENTICATION_ERROR': 'Invalid email or password',
        'VALIDATION_ERROR': 'Please check your input',
        'RATE_LIMIT_EXCEEDED': 'Too many login attempts. Please try again later.',
        'INTERNAL_SERVER_ERROR': 'Server error. Please try again later.',
      };
      
      const message = errorMessages[apiError.code] || apiError.message || 'Login failed';
      
      return {
        success: false,
        error: { message, code: apiError.code }
      };
    }
    
    const data = await response.json();
    return { success: true, data };
    
  } catch (error) {
    return {
      success: false,
      error: {
        message: 'Network error. Please check your connection.',
        code: 'NETWORK_ERROR'
      }
    };
  }
};

// Example: React hook for API calls
export const useApiCall = () => {
  const makeApiCall = async (url: string, options?: RequestInit) => {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const apiError = await response.json() as ApiError;
        
        // Handle specific error types
        switch (apiError.code) {
          case 'AUTHENTICATION_ERROR':
            window.location.href = '/login';
            throw new Error('Please log in again');
          case 'AUTHORIZATION_ERROR':
            window.location.href = '/unauthorized';
            throw new Error('You do not have permission to access this resource');
          case 'VALIDATION_ERROR':
            throw new Error('Please check your input data');
          default:
            throw new Error(apiError.message || 'An error occurred');
        }
      }
      
      return await response.json();
      
    } catch (error) {
      // Re-throw if it's already an error
      if (error instanceof Error) {
        throw error;
      }
      
      // Handle network errors
      throw new Error('Network error. Please check your connection.');
    }
  };
  
  return { makeApiCall };
}; 