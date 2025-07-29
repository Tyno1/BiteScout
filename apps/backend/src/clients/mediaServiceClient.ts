import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import FormData from "form-data";

export interface MediaUploadResponse {
	media: {
		id: string;
		url: string;
		originalName: string;
		mimeType: string;
		fileSize: number;
		width?: number;
		height?: number;
		provider: string;
		providerId: string;
		variants: Array<{
			id: string;
			size: string;
			url: string;
			width?: number;
			height?: number;
			fileSize: number;
			format: string;
		}>;
		userId?: string;
		tags?: string[];
		createdAt: string;
		updatedAt: string;
	};
	variants: Array<{
		id: string;
		size: string;
		url: string;
		width?: number;
		height?: number;
		fileSize: number;
		format: string;
	}>;
}

export interface MediaMetadata {
	id: string;
	url: string;
	originalName: string;
	mimeType: string;
	fileSize: number;
	width?: number;
	height?: number;
	provider: string;
	providerId: string;
	variants: Array<{
		id: string;
		size: string;
		url: string;
		width?: number;
		height?: number;
		fileSize: number;
		format: string;
	}>;
	userId?: string;
	tags?: string[];
	createdAt: string;
	updatedAt: string;
}

export class MediaServiceClient {
	private client: AxiosInstance;
	private baseUrl: string;

	constructor() {
		this.baseUrl =
			process.env.MEDIA_SERVICE_URL || "http://localhost:3002/api/v1";

		this.client = axios.create({
			baseURL: this.baseUrl,
			timeout: Number.parseInt(process.env.MEDIA_SERVICE_TIMEOUT || "30000"),
			headers: {
				"Content-Type": "application/json",
			},
		});

		// Add request interceptor for logging
		this.client.interceptors.request.use(
			(config) => {
				console.log(
					`[MediaService] ${config.method?.toUpperCase()} ${config.url}`,
				);
				return config;
			},
			(error) => {
				console.error("[MediaService] Request error:", error);
				return Promise.reject(error);
			},
		);

		// Add response interceptor for error handling
		this.client.interceptors.response.use(
			(response) => response,
			(error) => {
				console.error(
					"[MediaService] Response error:",
					error.response?.data || error.message,
				);
				return Promise.reject(error);
			},
		);
	}

	/**
	 * Upload a file to the media service
	 */
	async uploadFile(
		file: Express.Multer.File,
		metadata?: {
			userId?: string;
			tags?: string[];
			folder?: string;
			provider?: "cloudinary" | "aws-s3";
		},
	): Promise<MediaUploadResponse> {
		try {
			const formData = new FormData();

			// Add the file
			formData.append("file", file.buffer, {
				filename: file.originalname,
				contentType: file.mimetype,
			});

			// Add metadata if provided
			if (metadata) {
				if (metadata.userId) {
					formData.append("userId", metadata.userId);
				}
				if (metadata.tags) {
					formData.append("tags", JSON.stringify(metadata.tags));
				}
				if (metadata.folder) {
					formData.append("folder", metadata.folder);
				}
				if (metadata.provider) {
					formData.append("provider", metadata.provider);
				}
			}

			const response: AxiosResponse<MediaUploadResponse> =
				await this.client.post("/media/upload", formData, {
					headers: {
						...formData.getHeaders(),
					},
				});

			return response.data;
		} catch (error) {
			console.error("[MediaService] Upload failed:", error);
			throw new Error(
				error instanceof Error ? error.message : "Unknown error occurred"
			);
		}
	}

	/**
	 * Get media by ID from the media service
	 */
	async getMedia(mediaId: string, size?: string): Promise<MediaMetadata> {
		const response: AxiosResponse<MediaMetadata> = await this.client.get(
			`/media/${mediaId}`,
			{
				params: { size },
			},
		);
		return response.data;
	}

	/**
	 * Get optimized URL for media
	 */
	async getOptimizedUrl(
		mediaId: string,
		size?: string,
		networkSpeed?: "slow" | "medium" | "fast",
	): Promise<{ url: string }> {
		const response: AxiosResponse<{ url: string }> = await this.client.get(
			`/media/${mediaId}/optimized`,
			{
				params: { size, networkSpeed },
			},
		);
		return response.data;
	}

	/**
	 * Delete media from the media service
	 */
	async deleteMedia(mediaId: string, userId?: string): Promise<void> {
		await this.client.delete(`/media/${mediaId}`, {
			params: { userId },
		});
	}

	/**
	 * Get media statistics
	 */
	async getStats(): Promise<{
		totalMedia: number;
		totalSize: number;
		providers: Record<string, number>;
		types: Record<string, number>;
	}> {
		const response: AxiosResponse = await this.client.get(
			"/media/stats/overview",
		);
		return response.data;
	}

	/**
	 * Health check for the media service
	 */
	async healthCheck(): Promise<{ status: string; timestamp: string }> {
		const response: AxiosResponse<{ status: string; timestamp: string }> =
			await this.client.get("/media/health/check");
		return response.data;
	}

	/**
	 * Get media by user ID
	 */
	async getMediaByUserId(userId: string): Promise<MediaMetadata[]> {
		const response: AxiosResponse<MediaMetadata[]> = await this.client.get(
			`/media/user/${userId}`,
		);
		return response.data;
	}

	/**
	 * Get media by tags
	 */
	async getMediaByTags(tags: string[]): Promise<MediaMetadata[]> {
		const response: AxiosResponse<MediaMetadata[]> = await this.client.get(
			"/media/tags",
			{
				params: { tags: tags.join(",") },
			},
		);
		return response.data;
	}
}

// Export a singleton instance
export const mediaServiceClient = new MediaServiceClient();
