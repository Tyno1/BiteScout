import { getUserMedia } from "@/api/media/queries";
import type { GetMediaResponse } from "@shared/types";
import type { PaginatedResponse } from "@shared/types/common";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// Hook for fetching user's media with pagination
export const useUserMedia = (userId: string, page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["media", "user", userId, page, limit],
    queryFn: () => getUserMedia(userId, page, limit),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes (shorter for user media)
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for fetching all user media (for infinite scroll)
export const useUserMediaInfinite = (userId: string, limit = 10) => {
  return useInfiniteQuery({
    queryKey: ["media", "user", "infinite", userId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getUserMedia(userId, pageParam, limit),
    getNextPageParam: (lastPage: PaginatedResponse<GetMediaResponse>) => {
      if (lastPage.pagination.page < lastPage.pagination.totalPages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
