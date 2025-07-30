import type { 
	GetMediaResponse,
	UploadMediaResponse,
	components 
} from '@shared/types';
import type { PaginatedResponse } from '@shared/types/common';
import apiClient from './authClient';

// Type aliases for convenience (only where needed)
export type MediaVariant = components['schemas']['MediaVariant'];

// Re-export types for components to use
export type { GetMediaResponse, UploadMediaResponse, PaginatedResponse };

// Configuration object
const config = {
	mediaServiceUrl: process.env.NEXT_PUBLIC_MEDIA_SERVICE_URL || "http://localhost:3002/api/v1",
} as const;

// Pure function for creating form data
const createUploadFormData = (
	file: File,
	metadata: {
		title?: string;
		description?: string;
		tags?: string[];
		folder?: string;
		associatedWith?: { type: string; id: string };
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
		associatedWith?: { type: string; id: string };
	} = {},
): Promise<UploadMediaResponse> => {
	const formData = createUploadFormData(file, metadata);

	const response = await apiClient.post<UploadMediaResponse>("/media/upload", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return response.data;
};

// Pure function for getting media by ID
export const getMedia = async (mediaId: string): Promise<GetMediaResponse> => {
	const response = await apiClient.get<GetMediaResponse>(`/media/${mediaId}`);
	return response.data;
};

// Pure function for getting optimized URL
export const getOptimizedUrl = async (
	mediaId: string,
	size = "medium",
	networkSpeed?: "slow" | "medium" | "fast",
): Promise<{ url: string }> => {
	const params = buildQueryParams({ size, ...(networkSpeed && { networkSpeed }) });

	const response = await apiClient.get<{ url: string }>(
		`${config.mediaServiceUrl}/media/${mediaId}/optimized?${params}`,
		{
			baseURL: config.mediaServiceUrl,
		}
	);

	return response.data;
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
