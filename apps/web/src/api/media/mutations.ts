import apiClient from '@/utils/authClient';
import config from '@/utils/config';
import type { 
  GetMediaResponse,
  UploadMediaResponse 
} from '@shared/types';
import type { Media } from '@shared/types';
import axios from 'axios';

// Media service response type
interface MediaServiceResponse {
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
    variants: Array<{
      url: string;
      width?: number;
      height?: number;
      format?: string;
      quality?: string;
    }>;
    userId?: string;
    tags?: string[];
    title?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  variants: Array<{
    url: string;
    width?: number;
    height?: number;
    format?: string;
    quality?: string;
  }>;
}

// Pure function for creating form data
const createUploadFormData = (
  file: File,
  metadata: {
    title?: string;
    description?: string;
    tags?: string[];
    folder?: string;
    associatedWith?: Media["associatedWith"];
  } = {}
): FormData => {
  const formData = new FormData();
  formData.append("file", file);

  if (metadata.title) formData.append("title", metadata.title);
  if (metadata.description) formData.append("description", metadata.description);
  if (metadata.tags) formData.append("tags", JSON.stringify(metadata.tags));
  if (metadata.folder) formData.append("folder", metadata.folder);
  if (metadata.associatedWith) {
    formData.append("associatedWith", JSON.stringify(metadata.associatedWith));
  }

  return formData;
};

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
  const formData = createUploadFormData(file, metadata);

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