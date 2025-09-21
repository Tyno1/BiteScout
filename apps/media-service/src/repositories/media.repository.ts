import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import type { MediaMetadata, MediaQuery } from "../interfaces/media.interface";
import { Media, type MediaDocument } from "../schemas/media.schema";

@Injectable()
export class MediaRepository {
	private readonly logger = new Logger(MediaRepository.name);

	constructor(
    @InjectModel(Media.name) private mediaModel: Model<MediaDocument>,
  ) {}

	async create(mediaData: MediaMetadata): Promise<MediaDocument> {
		try {
			const media = new this.mediaModel(mediaData);
			return await media.save();
		} catch (error) {
			this.logger.error(`Failed to create media record: ${error.message}`);
			throw error;
		}
	}

	async findById(mediaId: string): Promise<MediaDocument | null> {
		try {
			return await this.mediaModel.findById(mediaId).exec();
		} catch (error) {
			this.logger.error(`Failed to find media by ID: ${error.message}`);
			throw error;
		}
	}

	async findByQuery(query: MediaQuery): Promise<MediaDocument[]> {
		try {
			      const filter: Record<string, unknown> = {};

			if (query.userId) {
				filter.userId = query.userId;
			}

			if (query.type) {
				const isImage = query.type === "image";
				filter.mimeType = {
					$regex: isImage ? /^image\// : /^video\//,
					$options: "i",
				};
			}

			if (query.tags && query.tags.length > 0) {
				filter.tags = { $in: query.tags };
			}

			let queryBuilder = this.mediaModel.find(filter);

			// Apply sorting
			if (query.sortBy) {
				const sortOrder = query.sortOrder === "desc" ? -1 : 1;
				queryBuilder = queryBuilder.sort({ [query.sortBy]: sortOrder });
			}

			// Apply pagination
			if (query.offset) {
				queryBuilder = queryBuilder.skip(query.offset);
			}

			if (query.limit) {
				queryBuilder = queryBuilder.limit(query.limit);
			}

			return await queryBuilder.exec();
		} catch (error) {
			this.logger.error(`Failed to find media by query: ${error.message}`);
			throw error;
		}
	}

	async update(
		mediaId: string,
		updateData: Partial<MediaMetadata>,
	): Promise<MediaDocument | null> {
		try {
			return await this.mediaModel
				.findOneAndUpdate(
					{ id: mediaId },
					{ ...updateData, updatedAt: new Date() },
					{ new: true },
				)
				.exec();
		} catch (error) {
			this.logger.error(`Failed to update media: ${error.message}`);
			throw error;
		}
	}

	async delete(mediaId: string): Promise<boolean> {
		try {
			const result = await this.mediaModel.deleteOne({ id: mediaId }).exec();
			return result.deletedCount > 0;
		} catch (error) {
			this.logger.error(`Failed to delete media: ${error.message}`);
			throw error;
		}
	}

	  async getStats(): Promise<{
		total: number;
		images: number;
		videos: number;
		totalSize: number;
		byProvider: Record<string, number>;
	}> {
		try {
			const total = await this.mediaModel.countDocuments();
			const images = await this.mediaModel.countDocuments({
				mimeType: { $regex: /^image\//, $options: "i" },
			});
			const videos = await this.mediaModel.countDocuments({
				mimeType: { $regex: /^video\//, $options: "i" },
			});

			const totalSizeResult = await this.mediaModel.aggregate([
				{ $group: { _id: null, totalSize: { $sum: "$fileSize" } } },
			]);

			const byProvider = await this.mediaModel.aggregate([
				{ $group: { _id: "$provider", count: { $sum: 1 } } },
			]);

			const totalSize =
				totalSizeResult.length > 0 ? totalSizeResult[0].totalSize : 0;
			const providerStats = byProvider.reduce((acc, item) => {
				acc[item._id] = item.count;
				return acc;
			}, {} as Record<string, number>);

			return {
				total,
				images,
				videos,
				totalSize,
				byProvider: providerStats,
			};
		} catch (error) {
			this.logger.error(`Failed to get stats: ${error.message}`);
			throw error;
		}
	}

	async findByUserId(userId: string): Promise<MediaDocument[]> {
		try {
			return await this.mediaModel.find({ userId }).exec();
		} catch (error) {
			this.logger.error(`Failed to find media by user ID: ${error.message}`);
			throw error;
		}
	}

	async findByTags(tags: string[]): Promise<MediaDocument[]> {
		try {
			return await this.mediaModel.find({ tags: { $in: tags } }).exec();
		} catch (error) {
			this.logger.error(`Failed to find media by tags: ${error.message}`);
			throw error;
		}
	}
}
