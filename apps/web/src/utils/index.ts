// API and error handling utilities
export { handleApiError as handleApiErrorLegacy } from "./apiErrorHandler";
export * from "./authClient";
export {
  convertLegacyError,
  getRedirectPath,
  getUserFriendlyMessage,
  getValidationErrors,
  handleApiError,
  isAuthenticationError,
  isAuthorizationError,
  isConflictError,
  isLegacyError,
  isRateLimitError,
  isResourceNotFoundError,
  isServerError,
  isValidationError,
  shouldRedirect,
} from "./errorHandler";
// Feature utilities
export * from "./featureUtils";
// Route and navigation utilities
export * from "./getMatchingRoute";
export * from "./getRoleFromSession";
// Media utilities
export * from "./mediaUtils";
// Authentication utilities
export * from "./refreshAccessToken";
// Restaurant filtering utilities
export * from "./restaurantFilters";
// Socket utilities
export * from "./socketService";
// Typography utilities
export * from "./typography";
