import { getVerifiedMedia } from "@/api/media/queries";
import type { GetMediaResponse } from "@shared/types";
import type { PaginatedResponse } from "@shared/types/common";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// Hook for fetching verified media with pagination
export const useVerifiedMedia = (
  page = 1,
  limit = 10,
  type?: "image" | "video"
) => {
  return useQuery({
    queryKey: ["media", "verified", page, limit, type],
    queryFn: () => getVerifiedMedia(page, limit, type),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching verified media with infinite scroll
export const useVerifiedMediaInfinite = (limit = 10, type?: "image" | "video") => {
  return useInfiniteQuery({
    queryKey: ["media", "verified", "infinite", type],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getVerifiedMedia(pageParam, limit, type),
    getNextPageParam: (lastPage: PaginatedResponse<GetMediaResponse>) => {
      if (lastPage.pagination.page < lastPage.pagination.totalPages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}; 