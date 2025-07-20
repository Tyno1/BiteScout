// Common types used across the application

// Currency type for price fields
export type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY" | "CNY" | "KRW" | "MYR" | "TWD" | "VND" | "THB" | "ZAR";

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Filter types
export interface BaseFilters {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Error types
export interface ApiError {
  message: string;
  error?: string;
  statusCode?: number;
  timestamp?: string;
} 