// Pagination Types - Common across all paginated endpoints
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

export interface CursorPaginationParams {
  cursor?: string;
  limit?: number;
}

export interface CursorPaginatedResponse<T> {
  data: T[];
  pagination: {
    nextCursor?: string;
    prevCursor?: string;
    hasNext: boolean;
    hasPrev: boolean;
  };
} 