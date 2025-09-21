import type { ApiError } from "shared/types/common/errors";
import axios from "axios";

/**
 * Helper function to handle API errors consistently across all stores
 * @param error - The error to handle (can be any type)
 * @returns A user-friendly error message string
 */
export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    // Handle the new standardized error format
    if (error.response?.data && typeof error.response.data === "object") {
      const errorData = error.response.data as ApiError;
      return errorData.message || "An error occurred";
    }
    // Fallback to legacy error format
    return error.response?.data?.message || error.response?.data?.error || error.message;
  }
  return error instanceof Error ? error.message : "An error has occurred";
}
