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
  CreateMediaResponse, 
  GetMediaResponse
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
): Promise<CreateMediaResponse> => {
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
  
  // Now sync the media metadata with the backend
  try {
    const mediaMetadata = {
      url: mediaServiceResponse.data.media.variants[0]?.url || '',
      type: mediaServiceResponse.data.media.mimeType.startsWith('image/') ? 'image' : 'video',
      title: metadata.title || mediaServiceResponse.data.media.originalName,
      description: metadata.description || '',
      associatedWith: metadata.associatedWith,
      providerId: mediaServiceResponse.data.media.providerId,
      mediaServiceId: mediaServiceResponse.data.media._id,
      provider: mediaServiceResponse.data.media.provider as "cloudinary" | "aws-s3",
      mimeType: mediaServiceResponse.data.media.mimeType,
      fileSize: mediaServiceResponse.data.media.fileSize || 0,
      dimensions: {
        width: mediaServiceResponse.data.media.variants[0]?.width,
        height: mediaServiceResponse.data.media.variants[0]?.height,
      },
      tags: metadata.tags || [],
    };

    // Send metadata to backend to create media record
    const backendResponse = await apiClient.post<CreateMediaResponse>("/media", mediaMetadata);
    
    return backendResponse.data;
  } catch (error: unknown) {
    console.error('Failed to sync media with backend:', error);
    
    // Since we can't create a proper Media object without backend sync,
    // throw an error to let the caller handle it
    throw new Error('Failed to sync media with backend. Media was uploaded but not saved.');
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