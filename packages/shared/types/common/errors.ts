// Standardized Error Types - Consistent across all endpoints
export interface BaseError {
  code: string;
  message: string;
  timestamp: string;
  path: string;
}

export interface ValidationError extends BaseError {
  code: 'VALIDATION_ERROR';
  details: {
    field: string;
    message: string;
    value?: unknown;
  }[];
}

export interface AuthenticationError extends BaseError {
  code: 'AUTHENTICATION_ERROR';
  details?: {
    reason: 'token_expired' | 'invalid_token' | 'missing_token';
  };
}

export interface AuthorizationError extends BaseError {
  code: 'AUTHORIZATION_ERROR';
  details?: {
    requiredRole: string;
    userRole: string;
    resource: string;
  };
}

export interface ResourceNotFoundError extends BaseError {
  code: 'RESOURCE_NOT_FOUND';
  details?: {
    resource: string;
    id: string;
  };
}

export interface ConflictError extends BaseError {
  code: 'CONFLICT_ERROR';
  details?: {
    resource: string;
    field: string;
    value: string;
  };
}

export interface RateLimitError extends BaseError {
  code: 'RATE_LIMIT_EXCEEDED';
  details?: {
    limit: number;
    resetTime: string;
  };
}

export interface ServerError extends BaseError {
  code: 'INTERNAL_SERVER_ERROR';
  details?: {
    requestId: string;
  };
}

export type ApiError = 
  | ValidationError 
  | AuthenticationError 
  | AuthorizationError 
  | ResourceNotFoundError 
  | ConflictError 
  | RateLimitError 
  | ServerError; 