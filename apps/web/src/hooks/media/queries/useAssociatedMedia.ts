import { getAssociatedMedia } from "@/api/media/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

// Hook for fetching media associated with a specific entity
export const useAssociatedMedia = (type: string, id: string) => {
  return useQuery({
    queryKey: ["media", "associated", type, id],
    queryFn: () => getAssociatedMedia(type, id),
    enabled: !!type && !!id,
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 8 * 60 * 1000, // 8 minutes
  });
};

// Hook for prefetching associated media
export const usePrefetchAssociatedMedia = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (type: string, id: string) => {
      queryClient.prefetchQuery({
        queryKey: ["media", "associated", type, id],
        queryFn: () => getAssociatedMedia(type, id),
        staleTime: 3 * 60 * 1000,
      });
    },
    [queryClient]
  );
};
