import * as fs from "node:fs";
import * as path from "node:path";
import { Injectable, Logger } from "@nestjs/common";
// biome-ignore lint/style/useImportType: NestJS DI needs runtime import
import  { ConfigService } from "@nestjs/config";
import * as AWS from "aws-sdk";
import * as ffmpeg from "fluent-ffmpeg";
import * as sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import type {
	ImageVariantConfig,
	MediaMetadata,
	MediaVariant,
	VideoVariantConfig,
} from "../interfaces/media.interface";

@Injectable()
export class AwsS3Provider {
	private readonly logger = new Logger(AwsS3Provider.name);
	private s3: AWS.S3;

	constructor(private configService: ConfigService) {
		this.s3 = new AWS.S3({
			accessKeyId: this.configService.get("aws.accessKeyId"),
			secretAccessKey: this.configService.get("aws.secretAccessKey"),
			region: this.configService.get("aws.region"),
		});
	}

	async uploadImage(
		file: Express.Multer.File,
		variants: Record<string, ImageVariantConfig>,
		folder?: string,
	): Promise<MediaMetadata> {
		try {
			const mediaId = uuidv4();
			const uploadPromises = Object.entries(variants).map(
				async ([size, config]) => {
					let processedBuffer: Buffer;
					let fileName: string;

					if (size === "original") {
						processedBuffer = file.buffer;
						fileName = `${mediaId}_original.${file.mimetype.split("/")[1]}`;
					} else {
						processedBuffer = await sharp(file.buffer)
							.resize(config.width, config.height, { fit: "fill" })
							.jpeg({ quality: config.quality })
							.toBuffer();
						fileName = `${mediaId}_${size}.jpg`;
					}

					const key = `${folder || "social-media"}/${fileName}`;

					const uploadResult = await this.s3
						.upload({
							Bucket: this.configService.get("aws.bucketName"),
							Key: key,
							Body: processedBuffer,
							ContentType: file.mimetype,
							ACL: "public-read",
						})
						.promise();

					return {
						id: `${mediaId}_${size}`,
						size,
						url: uploadResult.Location,
						width: config.width,
						height: config.height,
						fileSize: processedBuffer.length,
						format: file.mimetype.split("/")[1],
						createdAt: new Date(),
					} as MediaVariant;
				},
			);

			const variantsResults = await Promise.all(uploadPromises);
			const originalVariant = variantsResults.find(
				(v) => v.size === "original",
			);

			return {
				providerId: mediaId,
				provider: "aws-s3",
				originalName: file.originalname,
				format: file.mimetype.split("/")[1],
				fileSize: file.size,
				mimeType: file.mimetype,
				width: originalVariant?.width,
				height: originalVariant?.height,
				variants: variantsResults,
				createdAt: new Date(),
				updatedAt: new Date(),
			} as MediaMetadata;
		} catch (error) {
			this.logger.error(`Failed to upload image to S3: ${error.message}`);
			throw error;
		}
	}

	async uploadVideo(
		file: Express.Multer.File,
		variants: Record<string, VideoVariantConfig>,
		folder?: string,
	): Promise<MediaMetadata> {
		try {
			const mediaId = uuidv4();
			const tempDir = path.join(process.cwd(), "temp");

			if (!fs.existsSync(tempDir)) {
				fs.mkdirSync(tempDir, { recursive: true });
			}

			const originalPath = path.join(
				tempDir,
				`${mediaId}_original.${file.mimetype.split("/")[1]}`,
			);
			fs.writeFileSync(originalPath, file.buffer);

			const uploadPromises = Object.entries(variants).map(
				async ([size, config]) => {
					let videoPath: string;
					let fileName: string;

					if (size === "original") {
						videoPath = originalPath;
						fileName = `${mediaId}_original.${file.mimetype.split("/")[1]}`;
					} else {
						const outputPath = path.join(tempDir, `${mediaId}_${size}.mp4`);

						await new Promise<void>((resolve, reject) => {
							ffmpeg(originalPath)
								.videoCodec("libx264")
								.audioCodec("aac")
								.outputOptions([
									`-b:v ${config.bitrate}`,
									`-maxrate ${config.bitrate}`,
									`-bufsize ${Number.parseInt(config.bitrate) * 2}k`,
								])
								.size(
									config.resolution === "480p"
										? "854x480"
										: config.resolution === "720p"
											? "1280x720"
											: config.resolution === "1080p"
												? "1920x1080"
												: "?x?",
								)
								.output(outputPath)
								.on("end", () => resolve())
								.on("error", (err) => reject(err))
								.run();
						});

						videoPath = outputPath;
						fileName = `${mediaId}_${size}.mp4`;
					}

					const videoBuffer = fs.readFileSync(videoPath);
					const key = `${folder || "social-media/videos"}/${fileName}`;

					const uploadResult = await this.s3
						.upload({
							Bucket: this.configService.get("aws.bucketName"),
							Key: key,
							Body: videoBuffer,
							ContentType: size === "original" ? file.mimetype : "video/mp4",
							ACL: "public-read",
						})
						.promise();

					// Clean up temp files
					if (size !== "original") {
						fs.unlinkSync(videoPath);
					}

					return {
						id: `${mediaId}_${size}`,
						size,
						url: uploadResult.Location,
						bitrate: config.bitrate,
						resolution: config.resolution,
						fileSize: videoBuffer.length,
						format: "mp4",
						createdAt: new Date(),
					} as MediaVariant;
				},
			);

			const variantsResults = await Promise.all(uploadPromises);

			// Clean up original temp file
			fs.unlinkSync(originalPath);

			const originalVariant = variantsResults.find(
				(v) => v.size === "original",
			);

			return {
				providerId: mediaId,
				provider: "aws-s3",
				originalName: file.originalname,
				format: file.mimetype.split("/")[1],
				fileSize: file.size,
				mimeType: file.mimetype,
				variants: variantsResults,
				createdAt: new Date(),
				updatedAt: new Date(),
			} as MediaMetadata;
		} catch (error) {
			this.logger.error(`Failed to upload video to S3: ${error.message}`);
			throw error;
		}
	}

	async deleteMedia(providerId: string): Promise<void> {
		try {
			// Note: This is a simplified version. In a real implementation,
			// you'd need to track all variants and delete them individually
			await this.s3
				.deleteObject({
					Bucket: this.configService.get("aws.bucketName"),
					Key: providerId,
				})
				.promise();

			this.logger.log(`Successfully deleted media: ${providerId}`);
		} catch (error) {
			this.logger.error(`Failed to delete media from S3: ${error.message}`);
			throw error;
		}
	}

	async getMediaInfo(providerId: string): Promise<AWS.S3.HeadObjectOutput> {
		try {
			const result = await this.s3
				.headObject({
					Bucket: this.configService.get("aws.bucketName"),
					Key: providerId,
				})
				.promise();

			return result;
		} catch (error) {
			this.logger.error(`Failed to get media info from S3: ${error.message}`);
			throw error;
		}
	}
}
