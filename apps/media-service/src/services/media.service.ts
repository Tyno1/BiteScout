import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
} from "@nestjs/common";
// biome-ignore lint/style/useImportType: NestJS DI needs runtime import
import { ConfigService } from "@nestjs/config";
import type {
	ImageVariantConfig,
	MediaMetadata,
	MediaQuery,
	UploadResponse,
	VideoVariantConfig,
} from "../interfaces/media.interface";
// biome-ignore lint/style/useImportType: NestJS DI needs runtime import
import { AwsS3Provider } from "../providers/aws-s3.provider";
// biome-ignore lint/style/useImportType: NestJS DI needs runtime import
import { CloudinaryProvider } from "../providers/cloudinary.provider";
// biome-ignore lint/style/useImportType: NestJS DI needs runtime import
import { MediaRepository } from "../repositories/media.repository";

type ImageVariantsConfig = Record<string, ImageVariantConfig>;
type VideoVariantsConfig = Record<string, VideoVariantConfig>;

interface MediaStats {
	total: number;
	images: number;
	videos: number;
	totalSize: number;
	byProvider: Record<string, number>;
}

@Injectable()
export class MediaService {
	private readonly logger = new Logger(MediaService.name);

	constructor(
		private configService: ConfigService,
		private cloudinaryProvider: CloudinaryProvider,
		private awsS3Provider: AwsS3Provider,
		private mediaRepository: MediaRepository,
	) {}

	async uploadMedia(
		file: Express.Multer.File,
		userId?: string,
		tags?: string[],
		folder?: string,
		provider: "cloudinary" | "aws-s3" = "cloudinary",
		title?: string,
		description?: string,
	): Promise<UploadResponse> {
		try {
			// Validate file
			this.validateFile(file);

			// Determine media type
			const isImage = this.configService
				.get("media.allowedImageTypes")
				.includes(file.mimetype);
			const isVideo = this.configService
				.get("media.allowedVideoTypes")
				.includes(file.mimetype);

			if (!isImage && !isVideo) {
				throw new BadRequestException("Unsupported file type");
			}

			let mediaMetadata: MediaMetadata;

			if (isImage) {
				const imageVariants = this.configService.get("media.imageVariants");
				mediaMetadata = await this.uploadImage(
					file,
					imageVariants,
					folder,
					provider,
				);
			} else {
				const videoVariants = this.configService.get("media.videoVariants");
				mediaMetadata = await this.uploadVideo(
					file,
					videoVariants,
					folder,
					provider,
				);
			}

			// Add metadata
			mediaMetadata.userId = userId;
			mediaMetadata.tags = tags || [];
			if (title) {
				mediaMetadata.title = title;
			}
			if (description) {
				mediaMetadata.description = description;
			}

			// Save to MongoDB
			const savedMedia = await this.mediaRepository.create(mediaMetadata);

			this.logger.log(
				`Successfully uploaded and saved media: ${savedMedia.id}`,
			);

			const mediaData = savedMedia.toObject();
			return {
				media: mediaData,
				variants: mediaData.variants,
			};
		} catch (error) {
			this.logger.error(`Failed to upload media: ${error.message}`);
			throw new BadRequestException(error.message);
		}
	}

	private async uploadImage(
		file: Express.Multer.File,
		variants: ImageVariantsConfig,
		folder?: string,
		provider: "cloudinary" | "aws-s3" = "cloudinary",
	): Promise<MediaMetadata> {
		if (provider === "cloudinary") {
			return this.cloudinaryProvider.uploadImage(file, variants, folder);
		}
		return this.awsS3Provider.uploadImage(file, variants, folder);
	}

	private async uploadVideo(
		file: Express.Multer.File,
		variants: VideoVariantsConfig,
		folder?: string,
		provider: "cloudinary" | "aws-s3" = "cloudinary",
	): Promise<MediaMetadata> {
		if (provider === "cloudinary") {
			return this.cloudinaryProvider.uploadVideo(file, variants, folder);
		}
		return this.awsS3Provider.uploadVideo(file, variants, folder);
	}

	async getMedia(mediaId: string, size?: string): Promise<MediaMetadata> {
		const media = await this.mediaRepository.findById(mediaId);

		if (!media) {
			throw new NotFoundException(`Media with ID ${mediaId} not found`);
		}

		if (size) {
			const variant = media.variants.find((v) => v.size === size);
			if (!variant) {
				throw new NotFoundException(
					`Size variant ${size} not found for media ${mediaId}`,
				);
			}
		}

		return media.toObject();
	}

	async getMediaByQuery(query: MediaQuery): Promise<MediaMetadata[]> {
		const results = await this.mediaRepository.findByQuery(query);
		return results.map((media) => media.toObject());
	}

	async deleteMedia(mediaId: string, userId?: string): Promise<void> {
		const media = await this.mediaRepository.findById(mediaId);

		if (!media) {
			throw new NotFoundException(`Media with ID ${mediaId} not found`);
		}

		if (userId && media.userId !== userId) {
			throw new BadRequestException("Unauthorized to delete this media");
		}

		try {
			// Delete from provider
			if (media.provider === "cloudinary") {
				const isImage = this.configService
					.get("media.allowedImageTypes")
					.includes(media.mimeType);
				await this.cloudinaryProvider.deleteMedia(
					media.providerId,
					isImage ? "image" : "video",
				);
			} else {
				await this.awsS3Provider.deleteMedia(media.providerId);
			}

			// Remove from MongoDB
			await this.mediaRepository.delete(mediaId);

			this.logger.log(`Successfully deleted media: ${mediaId}`);
		} catch (error) {
			this.logger.error(`Failed to delete media: ${error.message}`);
			throw error;
		}
	}

	async getOptimizedUrl(
		mediaId: string,
		size: string,
		networkSpeed?: "slow" | "medium" | "fast",
	): Promise<string> {
		const media = await this.getMedia(mediaId);

		// Determine optimal size based on network speed
		let optimalSize = size;
		if (networkSpeed) {
			const sizeMap = {
				slow: "thumbnail",
				medium: "small",
				fast: "medium",
			};
			optimalSize = sizeMap[networkSpeed] || size;
		}

		const variant = media.variants.find((v) => v.size === optimalSize);
		if (!variant) {
			// Fallback to original if requested size not found
			const originalVariant = media.variants.find((v) => v.size === "original");
			if (!originalVariant) {
				throw new NotFoundException(`No variants found for media ${mediaId}`);
			}
			return originalVariant.url;
		}

		return variant.url;
	}

	private validateFile(file: Express.Multer.File): void {
		const maxFileSize = this.configService.get("media.maxFileSize");
		const allowedImageTypes = this.configService.get("media.allowedImageTypes");
		const allowedVideoTypes = this.configService.get("media.allowedVideoTypes");

		if (file.size > maxFileSize) {
			throw new BadRequestException(
				`File size exceeds maximum limit of ${maxFileSize} bytes`,
			);
		}

		const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];
		if (!allowedTypes.includes(file.mimetype)) {
			throw new BadRequestException(
				`File type ${file.mimetype} is not supported`,
			);
		}
	}

	async getMediaStats(): Promise<MediaStats> {
		return this.mediaRepository.getStats();
	}

	async getMediaByUserId(userId: string): Promise<MediaMetadata[]> {
		const results = await this.mediaRepository.findByUserId(userId);
		return results.map((media) => media.toObject());
	}

	async getMediaByTags(tags: string[]): Promise<MediaMetadata[]> {
		const results = await this.mediaRepository.findByTags(tags);
		return results.map((media) => media.toObject());
	}
}
