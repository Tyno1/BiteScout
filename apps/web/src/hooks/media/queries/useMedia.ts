import { getMedia, getMediaWithOptimizedUrl } from "@/api/media/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

// Query key factory for media queries
export const mediaKeys = {
  all: ["media"] as const,
  lists: () => [...mediaKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) => [...mediaKeys.lists(), filters] as const,
  details: () => [...mediaKeys.all, "detail"] as const,
  detail: (id: string) => [...mediaKeys.details(), id] as const,
  optimized: (id: string, size: string, networkSpeed?: string) => 
    [...mediaKeys.detail(id), "optimized", size, networkSpeed] as const,
};

// Hook for fetching media by ID
export const useMedia = (mediaId: string) => {
  return useQuery({
    queryKey: mediaKeys.detail(mediaId),
    queryFn: () => getMedia(mediaId),
    enabled: !!mediaId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching media with optimized URL
export const useMediaWithOptimizedUrl = (
  mediaId: string,
  size: "small" | "medium" | "large" = "medium",
  networkSpeed?: "slow" | "medium" | "fast"
) => {
  return useQuery({
    queryKey: mediaKeys.optimized(mediaId, size, networkSpeed),
    queryFn: () => getMediaWithOptimizedUrl(mediaId, size, networkSpeed),
    enabled: !!mediaId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for prefetching media (useful for navigation)
export const usePrefetchMedia = () => {
  const queryClient = useQueryClient();
  
  return useCallback((mediaId: string) => {
    queryClient.prefetchQuery({
      queryKey: mediaKeys.detail(mediaId),
      queryFn: () => getMedia(mediaId),
      staleTime: 5 * 60 * 1000,
    });
  }, [queryClient]);
}; 