import { getAssociatedMedia } from "@/api/media/queries";
import type { Media, PaginatedResponse } from "@shared/types";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UsePaginatedMediaOptions {
  type: string;
  id: string;
  limit?: number;
  enabled?: boolean;
}

export const usePaginatedMedia = ({
  type,
  id,
  limit = 8,
  enabled = true,
}: UsePaginatedMediaOptions) => {
  return useInfiniteQuery<PaginatedResponse<Media>>({
    queryKey: ["paginated-media", type, id, limit],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await getAssociatedMedia(type, id, pageParam as number, limit);
      return response;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination?.hasNext) {
        return (lastPage.pagination.page || 1) + 1;
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.pagination?.hasPrev) {
        return (firstPage.pagination.page || 1) - 1;
      }
      return undefined;
    },
    enabled: enabled && Boolean(type && id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Helper hook for restaurant gallery
export const usePaginatedRestaurantGallery = (restaurantId: string, enabled = true) => {
  return usePaginatedMedia({
    type: "restaurant",
    id: restaurantId,
    limit: 8,
    enabled,
  });
};

// Helper hook for post media
export const usePaginatedPostMedia = (postId: string, enabled = true) => {
  return usePaginatedMedia({
    type: "post",
    id: postId,
    limit: 8,
    enabled,
  });
};
