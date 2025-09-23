// Frontend error handling utilities for standardized API errors

import type { ApiError, BaseError } from "shared/types/common/errors";

// Type guard functions to check error types
export const isValidationError = (error: ApiError): boolean => {
  return error.code === "VALIDATION_ERROR";
};

export const isAuthenticationError = (error: ApiError): boolean => {
  return error.code === "AUTHENTICATION_ERROR";
};

export const isAuthorizationError = (error: ApiError): boolean => {
  return error.code === "AUTHORIZATION_ERROR";
};

export const isResourceNotFoundError = (error: ApiError): boolean => {
  return error.code === "RESOURCE_NOT_FOUND";
};

export const isConflictError = (error: ApiError): boolean => {
  return error.code === "CONFLICT_ERROR";
};

export const isRateLimitError = (error: ApiError): boolean => {
  return error.code === "RATE_LIMIT_EXCEEDED";
};

export const isServerError = (error: ApiError): boolean => {
  return error.code === "INTERNAL_SERVER_ERROR";
};

// Helper to extract validation error messages
export const getValidationErrors = (error: ApiError): string[] => {
  if (isValidationError(error) && error.details && Array.isArray(error.details)) {
    return error.details.map(
      (detail: { field: string; message: string }) => `${detail.field}: ${detail.message}`
    );
  }
  return [error.message];
};

// Helper to get user-friendly error message
export const getUserFriendlyMessage = (error: ApiError): string => {
  switch (error.code) {
    case "VALIDATION_ERROR":
      return "Please check your input and try again.";
    case "AUTHENTICATION_ERROR":
      return "Please log in again to continue.";
    case "AUTHORIZATION_ERROR":
      return "You don't have permission to perform this action.";
    case "RESOURCE_NOT_FOUND":
      return "The requested resource was not found.";
    case "CONFLICT_ERROR":
      return "This resource already exists.";
    case "RATE_LIMIT_EXCEEDED":
      return "Too many requests. Please try again later.";
    case "INTERNAL_SERVER_ERROR":
      return "Something went wrong. Please try again later.";
    default:
      return (error as ApiError).message;
  }
};

// Helper to check if error should trigger a redirect
export const shouldRedirect = (error: ApiError): boolean => {
  return isAuthenticationError(error) || isAuthorizationError(error);
};

// Helper to get redirect path based on error
export const getRedirectPath = (error: ApiError): string => {
  if (isAuthenticationError(error)) {
    return "/login";
  }
  if (isAuthorizationError(error)) {
    return "/unauthorized";
  }
  return "/";
};

// Main error handler function
export const handleApiError = (
  error: ApiError
): {
  message: string;
  details: string[];
  shouldRedirect: boolean;
  redirectPath: string;
  isValidation: boolean;
} => {
  return {
    message: getUserFriendlyMessage(error),
    details: getValidationErrors(error),
    shouldRedirect: shouldRedirect(error),
    redirectPath: getRedirectPath(error),
    isValidation: isValidationError(error),
  };
};

// Legacy error format support (for backward compatibility)
export const isLegacyError = (error: unknown): boolean => {
  return Boolean(
    error && typeof error === "object" && error !== null && "error" in error && !("code" in error)
  );
};

export const convertLegacyError = (legacyError: { error?: string }): BaseError => {
  return {
    code: "INTERNAL_SERVER_ERROR",
    message: legacyError.error || "An error occurred",
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
  };
};
