import { uploadFile } from "@/api/media/mutations";
import type { UploadMediaResponse } from "@shared/types";
import type { Media } from "@shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Upload metadata type
export interface UploadMetadata {
  title?: string;
  description?: string;
  tags?: string[];
  folder?: string;
  associatedWith?: Media["associatedWith"];
}

// Upload progress callback type
export type UploadProgressCallback = (progress: number) => void;

// Hook for uploading media with progress tracking
export const useMediaUpload = (onProgress?: UploadProgressCallback) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      file, 
      metadata 
    }: { 
      file: File; 
      metadata?: UploadMetadata;
    }): Promise<UploadMediaResponse> => {
      // Create a custom upload function with progress tracking
      const uploadWithProgress = async (): Promise<UploadMediaResponse> => {
        // Simulate progress for now (in a real implementation, you'd track actual upload progress)
        if (onProgress) {
          // Simulate progress from 0 to 90% during upload
          for (let i = 0; i <= 90; i += 10) {
            setTimeout(() => onProgress(i), i * 50);
          }
        }
        
        const result = await uploadFile(file, metadata);
        
        // Complete the progress
        if (onProgress) {
          onProgress(100);
        }
        
        return result;
      };
      
      return uploadWithProgress();
    },
    
    onSuccess: (data, variables) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["media"] });
      
      // If associated with an entity, invalidate associated media queries
      if (variables.metadata?.associatedWith) {
        const { type, id } = variables.metadata.associatedWith;
        queryClient.invalidateQueries({ 
          queryKey: ["media", "associated", type, id] 
        });
      }
      
      // Optimistically update user media if we have user context
      // This would require user context from your auth system
      // queryClient.invalidateQueries({ queryKey: ["media", "user"] });
    },
    onError: (error) => {
      console.error("Media upload failed:", error);
      // Reset progress on error
      if (onProgress) {
        onProgress(0);
      }
    },
  });
};

// Hook for batch uploading multiple files
export const useBatchMediaUpload = (onProgress?: UploadProgressCallback) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      files, 
      metadata 
    }: { 
      files: File[]; 
      metadata?: UploadMetadata;
    }): Promise<UploadMediaResponse[]> => {
      const uploadPromises = files.map((file, index) => {
        const fileMetadata = {
          ...metadata,
          title: metadata?.title ? `${metadata.title} ${index + 1}` : undefined,
        };
        
        return uploadFile(file, fileMetadata);
      });
      
      const results = await Promise.all(uploadPromises);
      
      // Report overall progress
      if (onProgress) {
        onProgress(100);
      }
      
      return results;
    },
    onSuccess: (data, variables) => {
      // Invalidate all media queries
      queryClient.invalidateQueries({ queryKey: ["media"] });
      
      // If associated with an entity, invalidate associated media queries
      if (variables.metadata?.associatedWith) {
        const { type, id } = variables.metadata.associatedWith;
        queryClient.invalidateQueries({ 
          queryKey: ["media", "associated", type, id] 
        });
      }
    },
    onError: (error) => {
      console.error("Batch media upload failed:", error);
      if (onProgress) {
        onProgress(0);
      }
    },
  });
}; 