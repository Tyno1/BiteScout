import apiClient from '@/utils/authClient';
import config from '@/utils/config';
import type { 
  GetMediaResponse,
  PaginatedResponse, 
} from '@shared/types';
import axios from 'axios';

// Type aliases for convenience
export type MediaVariant = {
  url: string;
  width?: number;
  height?: number;
  format?: string;
  quality?: string;
};


// Pure function for building query parameters
const buildQueryParams = (params: Record<string, string | number | boolean>): string => {
  const searchParams = new URLSearchParams();
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  }

  return searchParams.toString();
};

// Get media by ID
export const getMedia = async (mediaId: string): Promise<GetMediaResponse> => {
  const response = await apiClient.get<GetMediaResponse>(`/media/${mediaId}`);
  return response.data;
};

// Get media with optimized URL
export const getMediaWithOptimizedUrl = async (
  mediaId: string,
  size = "medium",
  networkSpeed?: "slow" | "medium" | "fast",
): Promise<{ media: GetMediaResponse; optimizedUrl: string }> => {
  const media = await getMedia(mediaId);
  
  try {
    const mediaServiceId = (media as { mediaServiceId?: string }).mediaServiceId;
    if (!mediaServiceId) {
      throw new Error(`No mediaServiceId found for media ${mediaId}`);
    }

    const params = buildQueryParams({ size, ...(networkSpeed && { networkSpeed }) });

    const response = await axios.get<{ url: string }>(
      `${config.mediaService.url}/media/${mediaServiceId}/optimized?${params}`,
      {
        timeout: 5000,
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    return {
      media,
      optimizedUrl: response.data.url,
    };
  } catch (error) {
    // Fallback to original URL
    return {
      media,
      optimizedUrl: media.url,
    };
  }
};

// Get user's media with pagination
export const getUserMedia = async (
  userId: string,
  page = 1,
  limit = 10,
): Promise<PaginatedResponse<GetMediaResponse>> => {
  const params = buildQueryParams({ page, limit });
  const response = await apiClient.get<PaginatedResponse<GetMediaResponse>>(`/media/user/${userId}?${params}`);
  return response.data;
};

// Get associated media
export const getAssociatedMedia = async (type: string, id: string): Promise<GetMediaResponse[]> => {
  const response = await apiClient.get<GetMediaResponse[]>(`/media/associated/${type}/${id}`);
  return response.data;
};

// Get verified media
export const getVerifiedMedia = async (
  page = 1,
  limit = 10,
  type?: "image" | "video",
): Promise<PaginatedResponse<GetMediaResponse>> => {
  const params = buildQueryParams({ page, limit, ...(type && { type }) });
  const response = await apiClient.get<PaginatedResponse<GetMediaResponse>>(`/media/verified?${params}`);
  return response.data;
}; 