import {
  deleteMedia,
  updateMedia,
  updateMediaAssociation,
  verifyMedia,
} from "@/api/media/mutations";
import type { GetMediaResponse } from "@shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Hook for updating media
export const useUpdateMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mediaId, updates }: { mediaId: string; updates: Partial<GetMediaResponse> }) =>
      updateMedia(mediaId, updates),
    onSuccess: (data, variables) => {
      // Update the specific media in cache
      queryClient.setQueryData(["media", "detail", variables.mediaId], data);

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["media"] });

      // If media is associated with an entity, invalidate associated queries
      if (data.associatedWith) {
        const { type, id } = data.associatedWith;
        queryClient.invalidateQueries({
          queryKey: ["media", "associated", type, id],
        });
      }
    },
  });
};

// Hook for deleting media
export const useDeleteMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mediaId: string) => deleteMedia(mediaId),
    onSuccess: (_, mediaId) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: ["media", "detail", mediaId],
      });

      // Invalidate all media queries
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
  });
};

// Hook for verifying media
export const useVerifyMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mediaId: string) => verifyMedia(mediaId),
    onSuccess: (data, mediaId) => {
      // Update the specific media in cache
      queryClient.setQueryData(["media", "detail", mediaId], data);

      // Invalidate verified media queries
      queryClient.invalidateQueries({
        queryKey: ["media", "verified"],
      });

      // Invalidate all media queries
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
  });
};

// Hook for updating media association
export const useUpdateMediaAssociation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      mediaId,
      associatedWith,
    }: {
      mediaId: string;
      associatedWith: { type: string; id: string };
    }) => updateMediaAssociation(mediaId, associatedWith),
    onSuccess: (data, variables) => {
      // Update the specific media in cache
      queryClient.setQueryData(["media", "detail", variables.mediaId], data);

      // Invalidate associated media queries for the new association
      const { type, id } = variables.associatedWith;
      queryClient.invalidateQueries({
        queryKey: ["media", "associated", type, id],
      });

      // Invalidate all media queries
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
  });
};

// Hook for batch deleting media
export const useBatchDeleteMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mediaIds: string[]) => {
      const deletePromises = mediaIds.map((id) => deleteMedia(id));
      await Promise.all(deletePromises);
      return mediaIds;
    },
    onSuccess: (mediaIds) => {
      // Remove all deleted media from cache
      for (const mediaId of mediaIds) {
        queryClient.removeQueries({
          queryKey: ["media", "detail", mediaId],
        });
      }

      // Invalidate all media queries
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
  });
};
