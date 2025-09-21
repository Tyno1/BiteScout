import { Readable } from "node:stream";
import { Injectable, Logger } from "@nestjs/common";
// biome-ignore lint/style/useImportType: NestJS DI needs runtime import
import { ConfigService } from "@nestjs/config";
import { type UploadApiResponse, v2 as cloudinary } from "cloudinary";
import type {
	ImageVariantConfig,
	MediaMetadata,
	MediaVariant,
	VideoVariantConfig,
} from "../interfaces/media.interface";

@Injectable()
export class CloudinaryProvider {
	private readonly logger = new Logger(CloudinaryProvider.name);

	constructor(private configService: ConfigService) {
		cloudinary.config({
			cloud_name: this.configService.get("cloudinary.cloudName"),
			api_key: this.configService.get("cloudinary.apiKey"),
			api_secret: this.configService.get("cloudinary.apiSecret"),
		});
	}

	async uploadImage(
		file: Express.Multer.File,
		variants: Record<string, ImageVariantConfig>,
		folder?: string,
	): Promise<MediaMetadata> {
		try {

			// Convert buffer to stream for Cloudinary
			const readableStream = new Readable();
			readableStream.push(file.buffer);
			readableStream.push(null);

			// First upload the original file
			const originalUploadResult = await new Promise<UploadApiResponse>(
				(resolve, reject) => {
					const uploadStream = cloudinary.uploader.upload_stream(
						{
							folder: folder || "social-media",
							public_id: `${Date.now()}_original`,
							resource_type: "image",
						},
						(error, result) => {
							if (error) {
								this.logger.error(`Upload stream error: ${error.message}`);
								reject(error);
							} else {
								resolve(result as UploadApiResponse);
							}
						},
					);

					readableStream.pipe(uploadStream);
				},
			);

			// Create original variant
			const originalVariant: MediaVariant = {
				size: "original",
				url: originalUploadResult.secure_url,
				width: originalUploadResult.width,
				height: originalUploadResult.height,
				fileSize: originalUploadResult.bytes || file.size,
				format: originalUploadResult.format || 'jpg',
				createdAt: new Date(originalUploadResult.created_at),
			};

			// Upload other variants using the original public_id
			const variantPromises = Object.entries(variants)
				.filter(([size]) => size !== "original")
				.map(async ([size, config]) => {
					const transformation = [
						{ width: config.width, height: config.height, crop: "fill" },
						{ quality: config.quality, fetch_format: "auto" },
					];

					// Create new stream for each variant
					const variantStream = new Readable();
					variantStream.push(file.buffer);
					variantStream.push(null);

					const variantResult = await new Promise<UploadApiResponse>(
						(resolve, reject) => {
							const uploadStream = cloudinary.uploader.upload_stream(
								{
									folder: folder || "social-media",
									transformation,
									public_id: `${originalUploadResult.public_id}_${size}`,
									resource_type: "image",
								},
								(error, result) => {
									if (error) {
										this.logger.error(`Variant upload error: ${error.message}`);
										reject(error);
									} else {
										resolve(result as UploadApiResponse);
									}
								},
							);

							variantStream.pipe(uploadStream);
						},
					);

					return {
						size,
						url: variantResult.secure_url,
						width: variantResult.width,
						height: variantResult.height,
						fileSize: variantResult.bytes,
						format: variantResult.format,
						createdAt: new Date(variantResult.created_at),
					} as MediaVariant;
				});

			const variantResults = await Promise.all(variantPromises);
			const allVariants = [originalVariant, ...variantResults];

			return {
				providerId: originalUploadResult.public_id,
				provider: 'cloudinary',
				originalName: file.originalname,
				format: originalUploadResult.format || 'jpg',
				url: originalUploadResult.secure_url,
				title: file.originalname,
				description: "",
				uploadedBy: "",
				verified: false,
				fileSize: file.size,
				mimeType: file.mimetype,
				width: originalUploadResult.width,
				height: originalUploadResult.height,
				dimensions:
					originalUploadResult.width && originalUploadResult.height
						? {
								width: originalUploadResult.width,
								height: originalUploadResult.height,
							}
						: undefined,
				variants: allVariants,
				createdAt: new Date(),
				updatedAt: new Date(),
			} as MediaMetadata;
		} catch (error) {
			this.logger.error(
				`Failed to upload image to Cloudinary: ${error.message}`,
			);
			throw error;
		}
	}

	async uploadVideo(
		file: Express.Multer.File,
		variants: Record<string, VideoVariantConfig>,
		folder?: string,
	): Promise<MediaMetadata> {
		try {
			// Convert buffer to stream for Cloudinary
			const readableStream = new Readable();
			readableStream.push(file.buffer);
			readableStream.push(null);

			// First upload the original file
			const originalUploadResult = await new Promise<UploadApiResponse>(
				(resolve, reject) => {
					const uploadStream = cloudinary.uploader.upload_stream(
						{
							folder: folder || "social-media/videos",
							public_id: `${Date.now()}_original`,
							resource_type: "video",
						},
						(error, result) => {
							if (error) {
								this.logger.error(`Upload stream error: ${error.message}`);
								reject(error);
							} else {
								resolve(result as UploadApiResponse);
							}
						},
					);

					readableStream.pipe(uploadStream);
				},
			);

			// Create original variant
			const originalVariant: MediaVariant = {
				size: "original",
				url: originalUploadResult.secure_url,
				fileSize: originalUploadResult.bytes || file.size,
				format: originalUploadResult.format || 'mp4',
				createdAt: new Date(originalUploadResult.created_at),
			};

			// Upload other variants
			const variantPromises = Object.entries(variants)
				.filter(([size]) => size !== "original")
				.map(async ([size, config]) => {
					const transformation = [
						{
							video_codec: "h264",
							bit_rate: config.bitrate,
							width:
								config.resolution === "480p"
									? 854
									: config.resolution === "720p"
										? 1280
										: config.resolution === "1080p"
											? 1920
											: "auto",
							height:
								config.resolution === "480p"
									? 480
									: config.resolution === "720p"
										? 720
										: config.resolution === "1080p"
											? 1080
											: "auto",
						},
					];

					// Create new stream for each variant
					const variantStream = new Readable();
					variantStream.push(file.buffer);
					variantStream.push(null);

					const variantResult = await new Promise<UploadApiResponse>(
						(resolve, reject) => {
							const uploadStream = cloudinary.uploader.upload_stream(
								{
									folder: folder || "social-media/videos",
									transformation,
									public_id: `${originalUploadResult.public_id}_${size}`,
									resource_type: "video",
								},
								(error, result) => {
									if (error) {
										this.logger.error(`Variant upload error: ${error.message}`);
										reject(error);
									} else {
										resolve(result as UploadApiResponse);
									}
								},
							);

							variantStream.pipe(uploadStream);
						},
					);

					return {
						size,
						url: variantResult.secure_url,
						bitrate: config.bitrate,
						resolution: config.resolution,
						fileSize: variantResult.bytes,
						format: variantResult.format,
						createdAt: new Date(variantResult.created_at),
					} as MediaVariant;
				});

			const variantResults = await Promise.all(variantPromises);
			const allVariants = [originalVariant, ...variantResults];

			return {
				providerId: originalUploadResult.public_id,
				provider: 'cloudinary',
				originalName: file.originalname,
				format: originalUploadResult.format || 'mp4',
				url: originalUploadResult.secure_url,
				title: file.originalname,
				description: "",
				uploadedBy: "",
				verified: false,
				fileSize: file.size,
				mimeType: file.mimetype,
				variants: allVariants,
				createdAt: new Date(),
				updatedAt: new Date(),
			} as MediaMetadata;
		} catch (error) {
			this.logger.error(
				`Failed to upload video to Cloudinary: ${error.message}`,
			);
			throw error;
		}
	}

	async deleteMedia(
		providerId: string,
		resourceType: "image" | "video",
	): Promise<void> {
		try {
			await cloudinary.uploader.destroy(providerId, {
				resource_type: resourceType,
			});
			this.logger.log(`Successfully deleted media: ${providerId}`);
		} catch (error) {
			this.logger.error(
				`Failed to delete media from Cloudinary: ${error.message}`,
			);
			throw error;
		}
	}

	async getMediaInfo(
		providerId: string,
		resourceType: "image" | "video",
	): Promise<Record<string, unknown>> {
		try {
			const result = await cloudinary.api.resource(providerId, {
				resource_type: resourceType,
			});
			return result;
		} catch (error) {
			this.logger.error(
				`Failed to get media info from Cloudinary: ${error.message}`,
			);
			throw error;
		}
	}
}
