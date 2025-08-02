import type { 
	GetMediaResponse,
	Media,
	UploadMediaResponse,
	components 
} from '@shared/types';
import type { PaginatedResponse } from '@shared/types/common';
import axios from 'axios';
import apiClient from './authClient';
import config from './config';

// Type aliases for convenience (only where needed)
export type MediaVariant = components['schemas']['MediaVariant'];

// Media service response type
interface MediaServiceResponse {
	media: {
		_id: string; // MongoDB ObjectId from media service
		providerId: string;
		provider: string;
		originalName: string;
		format: string;
		fileSize: number;
		mimeType: string;
		width?: number;
		height?: number;
		variants: MediaVariant[];
		userId?: string;
		tags?: string[];
		title?: string;
		description?: string;
		createdAt: Date;
		updatedAt: Date;
	};
	variants: MediaVariant[];
}

// Re-export types for components to use
export type { GetMediaResponse, UploadMediaResponse, PaginatedResponse };

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

// Pure function for uploading files
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
				variants: mediaServiceResponse.data.variants,
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
				variants: mediaServiceResponse.data.variants,
				tags: mediaServiceResponse.data.media.tags || [],
				createdAt: mediaServiceResponse.data.media.createdAt.toISOString(),
				updatedAt: mediaServiceResponse.data.media.updatedAt.toISOString(),
			};
			return fallbackResponse;
		}
};

// Pure function for getting media by ID
export const getMedia = async (mediaId: string): Promise<GetMediaResponse> => {
	// Get media from backend database (where references are stored)
	const response = await apiClient.get<GetMediaResponse>(`/media/${mediaId}`);
	return response.data;
};

// Pure function for getting optimized URL
export const getOptimizedUrl = async (
	mediaId: string,
	size = "medium",
	networkSpeed?: "slow" | "medium" | "fast",
): Promise<{ url: string }> => {
	try {
		// First get the media from backend to get the mediaServiceId
		const mediaData = await getMedia(mediaId);
		
		// Use the mediaServiceId to call media service (not backend _id)
		const mediaServiceId = (mediaData as { mediaServiceId?: string }).mediaServiceId;
		if (!mediaServiceId) {
			throw new Error(`No mediaServiceId found for media ${mediaId}`);
		}

		const params = buildQueryParams({ size, ...(networkSpeed && { networkSpeed }) });

		const response = await axios.get<{ url: string }>(
			`${config.mediaService.url}/media/${mediaServiceId}/optimized?${params}`,
			{
				timeout: 5000, // 5 second timeout
				headers: {
					'Accept': 'application/json',
				}
			}
		);

		return response.data;
	} catch (error) {
		// Fallback: get the original media URL
		try {
			const mediaData = await getMedia(mediaId);
			return { url: mediaData.url };
		} catch (fallbackError) {
			throw new Error(`Unable to retrieve media URL for ${mediaId}`);
		}
	}
};

// Pure function for getting user's media
export const getUserMedia = async (
	userId: string,
	page = 1,
	limit = 10,
): Promise<PaginatedResponse<GetMediaResponse>> => {
	const params = buildQueryParams({ page, limit });
	const response = await apiClient.get<PaginatedResponse<GetMediaResponse>>(`/media/user/${userId}?${params}`);
	return response.data;
};

// Pure function for getting associated media
export const getAssociatedMedia = async (type: string, id: string): Promise<GetMediaResponse[]> => {
	const response = await apiClient.get<GetMediaResponse[]>(`/media/associated/${type}/${id}`);
	return response.data;
};

// Pure function for getting verified media
export const getVerifiedMedia = async (
	page = 1,
	limit = 10,
	type?: "image" | "video",
): Promise<PaginatedResponse<GetMediaResponse>> => {
	const params = buildQueryParams({ page, limit, ...(type && { type }) });
	const response = await apiClient.get<PaginatedResponse<GetMediaResponse>>(`/media/verified?${params}`);
	return response.data;
};

// Pure function for updating media
export const updateMedia = async (mediaId: string, updates: Partial<GetMediaResponse>): Promise<GetMediaResponse> => {
	const response = await apiClient.put<GetMediaResponse>(`/media/${mediaId}`, updates);
	return response.data;
};

// Pure function for updating media association
export const updateMediaAssociation = async (mediaId: string, associatedWith: { type: string; id: string }): Promise<GetMediaResponse> => {
	const response = await apiClient.put<GetMediaResponse>(`/media/${mediaId}`, { associatedWith });
	return response.data;
};

// Pure function for deleting media
export const deleteMedia = async (mediaId: string): Promise<void> => {
	await apiClient.delete(`/media/${mediaId}`);
};

// Pure function for verifying media
export const verifyMedia = async (mediaId: string): Promise<GetMediaResponse> => {
	const response = await apiClient.patch<GetMediaResponse>(`/media/${mediaId}/verify`);
	return response.data;
};

// Export configuration for external use if needed
export const mediaApiConfig = config;
