import type {
	ApiError,
	AuthenticationError,
	AuthorizationError,
	ConflictError,
	RateLimitError,
	ResourceNotFoundError,
	ServerError,
	ValidationError
} from "@shared/types/common/errors";
import type { NextFunction, Request, Response } from "express";

// Error codes enum
export enum ErrorCodes {
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	CONFLICT = 409,
	RATE_LIMIT = 429,
	INTERNAL_SERVER_ERROR = 500,
}

// Custom error class that extends Error
export class AppError extends Error {
	public statusCode: number;
	public code: string;
	public details?: unknown;

	constructor(
		message: string,
		statusCode: number,
		code: string,
		details?: unknown,
	) {
		super(message);
		this.statusCode = statusCode;
		this.code = code;
		this.details = details;

		Error.captureStackTrace(this, this.constructor);
	}
}

// Helper function to create AppError instances
export const createError = (
	statusCode: number,
	message: string,
	code?: string,
	details?: unknown
): AppError => {
	return new AppError(
		message,
		statusCode,
		code || getErrorCode(statusCode),
		details
	);
};

// Helper function to get error code from status code
const getErrorCode = (statusCode: number): string => {
	switch (statusCode) {
		case 400:
			return 'VALIDATION_ERROR';
		case 401:
			return 'AUTHENTICATION_ERROR';
		case 403:
			return 'AUTHORIZATION_ERROR';
		case 404:
			return 'RESOURCE_NOT_FOUND';
		case 409:
			return 'CONFLICT_ERROR';
		case 429:
			return 'RATE_LIMIT_EXCEEDED';
		default:
			return 'INTERNAL_SERVER_ERROR';
	}
};

// Helper function to create standardized error response
const createErrorResponse = (error: ApiError): ApiError => ({
	...error,
	timestamp: new Date().toISOString(),
});

// Error handling middleware
const errorHandler = (
	err: Error | AppError,
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	console.error("Error:", err);

	let apiError: ApiError;
	const path = req.originalUrl;

	// Handle custom AppError
	if (err instanceof AppError) {
		apiError = createErrorResponse({
			code: err.code as ApiError['code'],
			message: err.message,
			timestamp: new Date().toISOString(),
			path,
			details: err.details,
		} as ApiError);
	}
	// Mongoose validation error
	else if (err.name === "ValidationError" && "errors" in err) {
		const validationError = err as { errors: Record<string, { path: string; message: string; value: unknown }> };
		const details = Object.values(validationError.errors).map((val) => ({
			field: val.path,
			message: val.message,
			value: val.value,
		}));

		apiError = createErrorResponse({
			code: "VALIDATION_ERROR",
			message: "Validation failed",
			timestamp: new Date().toISOString(),
			path,
			details,
		} as ValidationError);
	}
	// Mongoose duplicate key error
	else if ("code" in err && err.code === 11000) {
		const duplicateError = err as unknown as { keyValue: Record<string, unknown> };
		const field = Object.keys(duplicateError.keyValue)[0];
		const value = duplicateError.keyValue[field];

		apiError = createErrorResponse({
			code: "CONFLICT_ERROR",
			message: `${field} already exists`,
			timestamp: new Date().toISOString(),
			path,
			details: {
				resource: "database",
				field,
				value: String(value),
			},
		} as ConflictError);
	}
	// Mongoose cast error (invalid ObjectId)
	else if (err.name === "CastError") {
		const castError = err as unknown as { model?: { modelName: string }; value: string };
		apiError = createErrorResponse({
			code: "RESOURCE_NOT_FOUND",
			message: "Resource not found",
			timestamp: new Date().toISOString(),
			path,
			details: {
				resource: castError.model?.modelName || "resource",
				id: castError.value,
			},
		} as ResourceNotFoundError);
	}
	// JWT errors
	else if (err.name === "JsonWebTokenError") {
		apiError = createErrorResponse({
			code: "AUTHENTICATION_ERROR",
			message: "Invalid token",
			timestamp: new Date().toISOString(),
			path,
			details: {
				reason: "invalid_token",
			},
		} as AuthenticationError);
	} else if (err.name === "TokenExpiredError") {
		apiError = createErrorResponse({
			code: "AUTHENTICATION_ERROR",
			message: "Token expired",
			timestamp: new Date().toISOString(),
			path,
			details: {
				reason: "token_expired",
			},
		} as AuthenticationError);
	}
	// CORS error
	else if (err.message === "Not allowed by CORS") {
		apiError = createErrorResponse({
			code: "AUTHORIZATION_ERROR",
			message: "CORS policy violation",
			timestamp: new Date().toISOString(),
			path,
			details: {
				requiredRole: "allowed_origin",
				userRole: "blocked_origin",
				resource: "api_access",
			},
		} as AuthorizationError);
	}
	// Rate limit error
	else if ("status" in err && err.status === 429) {
		apiError = createErrorResponse({
			code: "RATE_LIMIT_EXCEEDED",
			message: "Too many requests",
			timestamp: new Date().toISOString(),
			path,
			details: {
				limit: 100, // Default limit, should be configurable
				resetTime: new Date(Date.now() + 60000).toISOString(), // 1 minute from now
			},
		} as RateLimitError);
	}
	// Default server error
	else {
		apiError = createErrorResponse({
			code: "INTERNAL_SERVER_ERROR",
			message: err.message || "Internal Server Error",
			timestamp: new Date().toISOString(),
			path,
			details: {
				requestId: req.headers["x-request-id"] || "unknown",
			},
		} as ServerError);
	}

	// Send error response
	const statusCode = err instanceof AppError ? err.statusCode : 500;
	res.status(statusCode).json({
		...apiError,
		...(process.env.NODE_ENV === "development" && { stack: err.stack }),
	});
};

export default errorHandler;
