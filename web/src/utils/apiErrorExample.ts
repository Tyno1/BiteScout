// Example: How to update existing API calls to use the new error handling

import { convertLegacyError, handleApiError, isLegacyError } from './errorHandler';

// OLD WAY (will break with new error structure)
export const oldApiCall = async () => {
  try {
    const response = await fetch('/api/restaurants');
    if (!response.ok) {
      const error = await response.json();
      // ❌ This will break - error.error no longer exists
      console.log(error.error); // This will be undefined
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
  }
};

// NEW WAY (works with new error structure)
export const newApiCall = async () => {
  try {
    const response = await fetch('/api/restaurants');
    if (!response.ok) {
      const error = await response.json();
      
      // Handle both new and legacy error formats
      let apiError: { code: string; message: string; timestamp: string; path: string; details?: unknown };
      if (isLegacyError(error)) {
        apiError = convertLegacyError(error);
      } else {
        apiError = error as { code: string; message: string; timestamp: string; path: string; details?: unknown };
      }
      
      // Use the new error handler
      const handledError = handleApiError(apiError);
      
      console.log('User-friendly message:', handledError.message);
      console.log('Error details:', handledError.details);
      
      // Handle redirects automatically
      if (handledError.shouldRedirect) {
        window.location.href = handledError.redirectPath;
        return;
      }
      
      // Handle validation errors specifically
      if (handledError.isValidation) {
        // Show validation errors in form
        for (const detail of handledError.details) {
          console.log(`Field ${detail.split(':')[0]} has error: ${detail.split(':')[1]}`);
        }
      }
    }
    return await response.json();
  } catch (error) {
    console.error('Network Error:', error);
  }
};

// Example: Update existing login function
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      
      // Handle legacy error format
      let apiError: { code: string; message: string; timestamp: string; path: string; details?: unknown };
      if (isLegacyError(error)) {
        apiError = convertLegacyError(error);
      } else {
        apiError = error as { code: string; message: string; timestamp: string; path: string; details?: unknown };
      }
      
      const handledError = handleApiError(apiError);
      
      // Return structured error for UI
      return {
        success: false,
        error: handledError
      };
    }
    
    const data = await response.json();
    return { success: true, data };
    
  } catch (error) {
    return {
      success: false,
      error: {
        message: 'Network error. Please check your connection.',
        details: [],
        shouldRedirect: false,
        redirectPath: '/',
        isValidation: false
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
        const error = await response.json();
        
        // Handle legacy error format
        let apiError: { code: string; message: string; timestamp: string; path: string; details?: unknown };
        if (isLegacyError(error)) {
          apiError = convertLegacyError(error);
        } else {
          apiError = error as { code: string; message: string; timestamp: string; path: string; details?: unknown };
        }
        
        const handledError = handleApiError(apiError);
        
        // You can throw the handled error or return it
        throw handledError;
      }
      
      return await response.json();
      
    } catch (error) {
      // Re-throw if it's already a handled error
      if (error && typeof error === 'object' && 'message' in error) {
        throw error;
      }
      
      // Handle network errors
      throw {
        message: 'Network error. Please check your connection.',
        details: [],
        shouldRedirect: false,
        redirectPath: '/',
        isValidation: false
      };
    }
  };
  
  return { makeApiCall };
}; 