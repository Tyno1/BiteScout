import type { components } from '@shared/types';

// Media service response type (used by mutations)
type MediaServiceResponse = {
  media: {
    _id: string;
    providerId: string;
    provider: string;
    originalName: string;
    format: string;
    fileSize: number;
    mimeType: string;
    width?: number;
    height?: number;
    variants: components['schemas']['MediaVariant'][];
    userId?: string;
    tags?: string[];
    title?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  variants: components['schemas']['MediaVariant'][];
};
import apiClient from '@/utils/authClient';
import config from '@/utils/config';
import { createUploadFormData } from '@/utils/mediaUtils';
import type { 
  GetMediaResponse,
  UploadMediaResponse 
} from '@shared/types';
import type { Media } from '@shared/types';
import axios from 'axios';

// Upload file
export const uploadFile = async (
  file: File,
  metadata: {
    title?: string;
    description?: string;
    tags?: string[];
    folder?: string;
    associatedWith?: Media["associatedWith"];
  } = {},
): Promise<UploadMediaResponse> => {
  // Only send media service specific fields to the media service
  const mediaServiceMetadata = {
    title: metadata.title,
    description: metadata.description,
    tags: metadata.tags,
    folder: metadata.folder,
  };
  
  const formData = createUploadFormData(file, mediaServiceMetadata);

  // Upload all media through media service for consistent processing
  const mediaServiceResponse = await axios.post<MediaServiceResponse>(
    `${config.mediaService.url}/media/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  
  // Sync to backend database
  try {
    const backendResponse = await apiClient.post<UploadMediaResponse>("/media", {
      url: mediaServiceResponse.data.media.variants[0]?.url || '',
      title: mediaServiceResponse.data.media.title || mediaServiceResponse.data.media.originalName,
      description: mediaServiceResponse.data.media.description || '',
      type: mediaServiceResponse.data.media.mimeType.startsWith('image/') ? 'image' : 'video',
      mimeType: mediaServiceResponse.data.media.mimeType,
      fileSize: mediaServiceResponse.data.media.fileSize,
      provider: mediaServiceResponse.data.media.provider as "cloudinary" | "aws-s3",
      providerId: mediaServiceResponse.data.media.providerId,
      mediaServiceId: mediaServiceResponse.data.media._id,
      variants: mediaServiceResponse.data.variants.map(variant => ({
        size: "original" as const,
        url: variant.url,
        width: variant.width,
        height: variant.height,
        fileSize: 0,
        format: variant.format || "unknown",
        createdAt: new Date().toISOString(),
      })),
      tags: mediaServiceResponse.data.media.tags || [],
      // Add associatedWith if provided
      ...(metadata.associatedWith && { associatedWith: metadata.associatedWith }),
    });
    
    return backendResponse.data;
  } catch (error: unknown) {
    console.error('Failed to sync to backend:', error);
    // Convert media service response to UploadMediaResponse format for fallback
    const fallbackResponse: UploadMediaResponse = {
      _id: '',
      url: mediaServiceResponse.data.media.variants[0]?.url || '',
      type: mediaServiceResponse.data.media.mimeType.startsWith('image/') ? 'image' : 'video',
      title: mediaServiceResponse.data.media.title || mediaServiceResponse.data.media.originalName,
      description: mediaServiceResponse.data.media.description || '',
      uploadedBy: { id: '', name: '', username: '', imageUrl: '' },
      providerId: mediaServiceResponse.data.media.providerId,
      provider: mediaServiceResponse.data.media.provider as "cloudinary" | "aws-s3",
      variants: mediaServiceResponse.data.variants.map(variant => ({
        size: "original" as const,
        url: variant.url,
        width: variant.width,
        height: variant.height,
        fileSize: 0,
        format: variant.format || "unknown",
        createdAt: new Date().toISOString(),
      })),
      tags: mediaServiceResponse.data.media.tags || [],
      createdAt: mediaServiceResponse.data.media.createdAt.toISOString(),
      updatedAt: mediaServiceResponse.data.media.updatedAt.toISOString(),
    };
    return fallbackResponse;
  }
};

// Update media
export const updateMedia = async (mediaId: string, updates: Partial<GetMediaResponse>): Promise<GetMediaResponse> => {
  const response = await apiClient.put<GetMediaResponse>(`/media/${mediaId}`, updates);
  return response.data;
};

// Update media association
export const updateMediaAssociation = async (mediaId: string, associatedWith: { type: string; id: string }): Promise<GetMediaResponse> => {
  const response = await apiClient.put<GetMediaResponse>(`/media/${mediaId}`, { associatedWith });
  return response.data;
};

// Delete media
export const deleteMedia = async (mediaId: string): Promise<void> => {
  await apiClient.delete(`/media/${mediaId}`);
};

// Verify media
export const verifyMedia = async (mediaId: string): Promise<GetMediaResponse> => {
  const response = await apiClient.patch<GetMediaResponse>(`/media/${mediaId}/verify`);
  return response.data;
}; 