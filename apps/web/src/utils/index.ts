// API and error handling utilities
export { handleApiError as handleApiErrorLegacy } from "./apiErrorHandler";
export * from "./authClient";
export { 
  isValidationError,
  isAuthenticationError,
  isAuthorizationError,
  isResourceNotFoundError,
  isConflictError,
  isRateLimitError,
  isServerError,
  getValidationErrors,
  getUserFriendlyMessage,
  shouldRedirect,
  getRedirectPath,
  handleApiError,
  isLegacyError,
  convertLegacyError
} from "./errorHandler";

// Media utilities
export * from "./mediaUtils";

// Authentication utilities
export * from "./refreshAccessToken";

// Route and navigation utilities
export * from "./getMatchingRoute";
export * from "./getRoleFromSession";



// Socket utilities
export * from "./socketService";

// Typography utilities
export * from "./typography";

// Feature utilities
export * from "./featureUtils";

// Restaurant filtering utilities
export * from "./restaurantFilters";