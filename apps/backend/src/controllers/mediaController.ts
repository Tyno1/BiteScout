/// <reference path="../types/express.d.ts" />
import type { NextFunction, Request, Response } from "express";
import type { 
	ApiError,
	CreateMediaRequest,
	CreateMediaResponse,
	DeleteMediaRequest,
	DeleteMediaResponse,
	GetMediaByAssociatedRequest,
	GetMediaByAssociatedResponse,
	GetMediaRequest,
	GetMediaResponse,
	GetUserMediaRequest,
	GetUserMediaResponse,
	GetVerifiedMediaResponse,
	Media as MediaType,
	UpdateMediaRequest,
	UpdateMediaResponse,
	VerifyMediaRequest,
	VerifyMediaResponse
} from "shared/types";
import type { Media as UploadMediaResponse } from "../../../../packages/shared/types/api/schemas";
import { mediaServiceClient } from "../clients/mediaServiceClient.js";
import { createError } from "../middleware/errorHandler.js";
import Media from "../models/Media.js";

// Helper function to validate request ID
const validateId = (req: Request) => {
	const { id } = req.params;
	if (!id) {
		throw createError(400, "No id provided");
	}
	return id;
};

// Helper function to validate and transform request body
const validateCreateMediaRequest = (body: unknown): CreateMediaRequest => {
	if (!body || typeof body !== 'object') {
		throw createError(400, "Invalid request body");
	}
	
	const bodyObj = body as Record<string, unknown>;
	
	if (!bodyObj.url || !bodyObj.type) {
		throw createError(400, "URL and type are required");
	}
	
	if (!["image", "video", "audio"].includes(bodyObj.type as string)) {
		throw createError(400, "Invalid media type");
	}
	
	return body as CreateMediaRequest;
};

// Helper function to validate and transform update request
const validateUpdateMediaRequest = (body: unknown): UpdateMediaRequest => {
	// Only allow specific fields to be updated
	const allowedFields = ['title', 'description', 'associatedWith'];
	const filteredBody = Object.keys(body as Record<string, unknown>)
		.filter(key => allowedFields.includes(key))
		.reduce((obj, key) => {
			(obj as Record<string, unknown>)[key] = (body as Record<string, unknown>)[key];
			return obj;
		}, {} as Record<string, unknown>);
	
	return filteredBody as UpdateMediaRequest;
};

export const createMedia = async (
	req: Request<Record<string, never>, CreateMediaResponse | ApiError, CreateMediaRequest>,
	res: Response<CreateMediaResponse | ApiError>,
	next: NextFunction,
): Promise<void> => {
	try {
		// Validate request body using shared type
		const validatedBody = validateCreateMediaRequest(req.body);

		// Add uploadedBy from authenticated user
		const mediaData = { ...validatedBody, uploadedBy: req.user?.userId };

		if (!mediaData.uploadedBy) {
			throw createError(401, "User not authenticated");
		}

		const newMedia = await Media.create(mediaData);

		if (!newMedia) {
			throw createError(400, "Could not create media");
		}

		// Populate uploadedBy user data
		await newMedia.populate([
			{ path: "uploadedBy", select: "name username imageUrl" },
		]);

		// Transform to match CreateMediaResponse type
		const response: CreateMediaResponse = {
			_id: newMedia._id.toString(),
			url: newMedia.url,
			type: newMedia.type,
			title: newMedia.title,
			description: newMedia.description,
			uploadedBy: {
				id: (newMedia.uploadedBy as { _id: string; name: string; username: string; imageUrl: string })._id.toString(),
				name: (newMedia.uploadedBy as { _id: string; name: string; username: string; imageUrl: string }).name,
				username: (newMedia.uploadedBy as { _id: string; name: string; username: string; imageUrl: string }).username,
				imageUrl: (newMedia.uploadedBy as { _id: string; name: string; username: string; imageUrl: string }).imageUrl,
			},
			associatedWith: newMedia.associatedWith,
			verified: newMedia.verified,
			fileSize: newMedia.fileSize,
			mimeType: newMedia.mimeType,
			dimensions: newMedia.dimensions,
			providerId: newMedia.providerId,
			provider: newMedia.provider,
			createdAt: newMedia.createdAt.toISOString(),
			updatedAt: newMedia.updatedAt.toISOString(),
		};

		res.status(201).json(response);
	} catch (error) {
		return next(error);
	}
};

export const getMediaById = async (
	req: Request<GetMediaRequest, GetMediaResponse | ApiError>,
	res: Response<GetMediaResponse | ApiError>,
	next: NextFunction,
) => {
	try {
		const id = validateId(req);

		const media = await Media.findById(id).populate([
			{ path: "uploadedBy", select: "name username imageUrl" },
		]);

		if (!media) {
			throw createError(404, "Media not found");
		}

		// Transform to match GetMediaResponse type
		const response: GetMediaResponse = {
			_id: media._id.toString(),
			url: media.url,
			type: media.type,
			title: media.title,
			description: media.description,
			uploadedBy: {
				id: media.uploadedBy._id.toString(),
				name: media.uploadedBy.name,
				username: media.uploadedBy.username,
				imageUrl: media.uploadedBy.imageUrl,
			},
			associatedWith: media.associatedWith,
			verified: media.verified,
			fileSize: media.fileSize,
			mimeType: media.mimeType,
			dimensions: media.dimensions,
			providerId: media.providerId,
			provider: media.provider,
			createdAt: media.createdAt.toISOString(),
			updatedAt: media.updatedAt.toISOString(),
		};

		res.json(response);
	} catch (error) {
		return next(error);
	}
};

export const getMediaByAssociatedItem = async (
	req: Request<GetMediaByAssociatedRequest, GetMediaByAssociatedResponse | ApiError>,
	res: Response<GetMediaByAssociatedResponse | ApiError>,
	next: NextFunction,
): Promise<void> => {
	try {
		const { type, id } = req.params;

		if (!type || !id) {
			throw createError(400, "Type and ID are required");
		}

		if (!["post", "dish"].includes(type)) {
			throw createError(400, "Invalid type. Must be 'post' or 'dish'");
		}

		const media = await Media.find({
			"associatedWith.type": type,
			"associatedWith.id": id,
		}).populate([{ path: "uploadedBy", select: "name username imageUrl" }]);

		// Transform to match GetMediaByAssociatedResponse type
		const response: GetMediaByAssociatedResponse = media.map(item => ({
			_id: item._id.toString(),
			url: item.url,
			type: item.type,
			title: item.title,
			description: item.description,
			uploadedBy: {
				id: item.uploadedBy._id.toString(),
				name: item.uploadedBy.name,
				username: item.uploadedBy.username,
				imageUrl: item.uploadedBy.imageUrl,
			},
			associatedWith: item.associatedWith,
			verified: item.verified,
			fileSize: item.fileSize,
			mimeType: item.mimeType,
			dimensions: item.dimensions,
			providerId: item.providerId,
			provider: item.provider,
			createdAt: item.createdAt.toISOString(),
			updatedAt: item.updatedAt.toISOString(),
		}));

		res.json(response);
	} catch (error) {
		next(error);
	}
};

export const getUserMedia = async (
	req: Request<GetUserMediaRequest, GetUserMediaResponse | ApiError, Record<string, never>, { page?: string; limit?: string }>,
	res: Response<GetUserMediaResponse | ApiError>,
	next: NextFunction,
): Promise<void> => {
	try {
		const { userId } = req.params;
		const { page = "1", limit = "10" } = req.query;

		const skip = (Number(page) - 1) * Number(limit);

		const media = await Media.find({ uploadedBy: userId })
			.populate([{ path: "uploadedBy", select: "name username imageUrl" }])
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(Number(limit));

		const total = await Media.countDocuments({ uploadedBy: userId });

		// Transform to match GetUserMediaResponse type
		const response: GetUserMediaResponse = {
			media: media.map(item => ({
				_id: item._id.toString(),
				url: item.url,
				type: item.type,
				title: item.title,
				description: item.description,
				uploadedBy: {
					id: item.uploadedBy._id.toString(),
					name: item.uploadedBy.name,
					username: item.uploadedBy.username,
					imageUrl: item.uploadedBy.imageUrl,
				},
				associatedWith: item.associatedWith,
				verified: item.verified,
				fileSize: item.fileSize,
				mimeType: item.mimeType,
				dimensions: item.dimensions,
				providerId: item.providerId,
				provider: item.provider,
				createdAt: item.createdAt.toISOString(),
				updatedAt: item.updatedAt.toISOString(),
			})),
			pagination: {
				currentPage: Number(page),
				totalPages: Math.ceil(total / Number(limit)),
				totalMedia: total,
				hasNextPage: skip + media.length < total,
				hasPrevPage: Number(page) > 1,
			},
		};

		res.json(response);
	} catch (error) {
		next(error);
	}
};

export const updateMedia = async (
	req: Request<{ id: string }, UpdateMediaResponse | ApiError, UpdateMediaRequest>,
	res: Response<UpdateMediaResponse | ApiError>,
	next: NextFunction,
): Promise<void> => {
	try {
		const { id } = req.params;
		
		// Validate request body using shared type
		const validatedBody = validateUpdateMediaRequest(req.body);

		// Check if media exists and user owns it
		const existingMedia = await Media.findById(id);
		if (!existingMedia) {
			throw createError(404, "Media not found");
		}

		if (existingMedia.uploadedBy.toString() !== req.user?.userId) {
			throw createError(403, "Not authorized to update this media");
		}

		const updatedMedia = await Media.findByIdAndUpdate(
			id,
			{ $set: validatedBody },
			{ new: true },
		).populate([{ path: "uploadedBy", select: "name username imageUrl" }]);

		if (!updatedMedia) {
			throw createError(404, "Media could not be updated");
		}

		// Transform to match UpdateMediaResponse type
		const response: UpdateMediaResponse = {
			_id: updatedMedia._id.toString(),
			url: updatedMedia.url,
			type: updatedMedia.type,
			title: updatedMedia.title,
			description: updatedMedia.description,
			uploadedBy: {
				id: updatedMedia.uploadedBy._id.toString(),
				name: updatedMedia.uploadedBy.name,
				username: updatedMedia.uploadedBy.username,
				imageUrl: updatedMedia.uploadedBy.imageUrl,
			},
			associatedWith: updatedMedia.associatedWith,
			verified: updatedMedia.verified,
			fileSize: updatedMedia.fileSize,
			mimeType: updatedMedia.mimeType,
			dimensions: updatedMedia.dimensions,
			providerId: updatedMedia.providerId,
			provider: updatedMedia.provider,
			createdAt: updatedMedia.createdAt.toISOString(),
			updatedAt: updatedMedia.updatedAt.toISOString(),
		};

		res.json(response);
	} catch (error) {
		return next(error);
	}
};

export const deleteMedia = async (
	req: Request<DeleteMediaRequest, DeleteMediaResponse | ApiError>,
	res: Response<DeleteMediaResponse | ApiError>,
	next: NextFunction,
) => {
	try {
		const id = validateId(req);

		// Check if media exists and user owns it
		const existingMedia = await Media.findById(id);
		if (!existingMedia) {
			throw createError(404, "Media not found");
		}

		if (existingMedia.uploadedBy.toString() !== req.user?.userId) {
			throw createError(403, "Not authorized to delete this media");
		}

		// Delete from media service first (if it has a provider ID)
		if (existingMedia.providerId) {
			try {
				await mediaServiceClient.deleteMedia(existingMedia.providerId, req.user?.userId);
			} catch (mediaServiceError) {
				console.error("[MediaService] Delete failed:", mediaServiceError);
				// Continue with database deletion even if media service fails
				// This prevents orphaned database records
			}
		}

		// Delete from database
		await Media.findByIdAndDelete(id);

		// Return DeleteMediaResponse type
		const response: DeleteMediaResponse = {
			message: "Media deleted successfully",
		};

		res.status(200).json(response);
	} catch (error) {
		return next(error);
	}
};

export const verifyMedia = async (
	req: Request<VerifyMediaRequest, VerifyMediaResponse | ApiError>,
	res: Response<VerifyMediaResponse | ApiError>,
	next: NextFunction,
): Promise<void> => {
	try {
		const { id } = req.params;

		// Only admins/moderators can verify media
		if (req.user?.userType !== "admin" && req.user?.userType !== "moderator") {
			throw createError(403, "Not authorized to verify media");
		}

		const media = await Media.findById(id);
		if (!media) {
			throw createError(404, "Media not found");
		}

		// Toggle verification status
		media.verified = !media.verified;
		await media.save();

		await media.populate([
			{ path: "uploadedBy", select: "name username imageUrl" },
		]);

		// Transform to match VerifyMediaResponse type
		const response: VerifyMediaResponse = {
			_id: media._id.toString(),
			url: media.url,
			type: media.type,
			title: media.title,
			description: media.description,
			uploadedBy: {
				id: media.uploadedBy._id.toString(),
				name: media.uploadedBy.name,
				username: media.uploadedBy.username,
				imageUrl: media.uploadedBy.imageUrl,
			},
			associatedWith: media.associatedWith,
			verified: media.verified,
			fileSize: media.fileSize,
			mimeType: media.mimeType,
			dimensions: media.dimensions,
			providerId: media.providerId,
			provider: media.provider,
			createdAt: media.createdAt.toISOString(),
			updatedAt: media.updatedAt.toISOString(),
		};

		res.json(response);
	} catch (error) {
		return next(error);
	}
};

export const getVerifiedMedia = async (
	req: Request<Record<string, never>, GetVerifiedMediaResponse | ApiError, Record<string, never>, { page?: string; limit?: string; type?: string }>,
	res: Response<GetVerifiedMediaResponse | ApiError>,
	next: NextFunction,
): Promise<void> => {
	try {
		const { page = "1", limit = "10", type } = req.query;

		const skip = (Number(page) - 1) * Number(limit);

		const filter: Record<string, unknown> = { verified: true };

		if (type && ["post", "dish"].includes(String(type))) {
			filter["associatedWith.type"] = type;
		}

		const media = await Media.find(filter)
			.populate([{ path: "uploadedBy", select: "name username imageUrl" }])
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(Number(limit));

		const total = await Media.countDocuments(filter);

		// Transform to match GetVerifiedMediaResponse type
		const response: GetVerifiedMediaResponse = {
			media: media.map(item => ({
				_id: item._id.toString(),
				url: item.url,
				type: item.type,
				title: item.title,
				description: item.description,
				uploadedBy: {
					id: item.uploadedBy._id.toString(),
					name: item.uploadedBy.name,
					username: item.uploadedBy.username,
					imageUrl: item.uploadedBy.imageUrl,
				},
				associatedWith: item.associatedWith,
				verified: item.verified,
				fileSize: item.fileSize,
				mimeType: item.mimeType,
				dimensions: item.dimensions,
				providerId: item.providerId,
				provider: item.provider,
				createdAt: item.createdAt.toISOString(),
				updatedAt: item.updatedAt.toISOString(),
			})),
			pagination: {
				currentPage: Number(page),
				totalPages: Math.ceil(total / Number(limit)),
				totalMedia: total,
				hasNextPage: skip + media.length < total,
				hasPrevPage: Number(page) > 1,
			},
		};

		res.json(response);
	} catch (error) {
		next(error);
	}
};

export const uploadFile = async (
	req: Request,
	res: Response<UploadMediaResponse | ApiError>,
	next: NextFunction,
): Promise<void> => {
	try {
		if (!req.file) {
			throw createError(400, "No file uploaded");
		}

		if (!req.user?.userId) {
			throw createError(401, "User not authenticated");
		}

		// Upload file to media service
		const uploadResult = await mediaServiceClient.uploadFile(req.file, {
			userId: req.user.userId,
			tags: req.body.tags ? JSON.parse(req.body.tags) : undefined,
			folder: req.body.folder,
		});



		// Build base media record
		const baseRecord = {
			url: uploadResult.media.variants?.[0]?.url || uploadResult.media.url,
			type: uploadResult.media.mimeType.startsWith("image/") ? "image" : "video",
			title: req.body.title || uploadResult.media.originalName,
			description: req.body.description || "",
			uploadedBy: req.user.userId,
			verified: false,
			fileSize: uploadResult.media.fileSize,
			mimeType: uploadResult.media.mimeType,
			dimensions: uploadResult.media.width && uploadResult.media.height ? {
				width: uploadResult.media.width,
				height: uploadResult.media.height,
			} : undefined,
			providerId: uploadResult.media.providerId,
			provider: uploadResult.media.provider,
			// Include advanced features from media service
			variants: uploadResult.variants || [],
			tags: uploadResult.media.tags || [],
		};

		// Handle associatedWith only if it's provided and valid
		let associatedWith: MediaType["associatedWith"] | undefined = undefined;
		if (req.body.associatedWith) {
			try {
				const parsedAssociatedWith = JSON.parse(req.body.associatedWith);
				// Only include associatedWith if both type and id are valid
				if (parsedAssociatedWith?.type && 
					parsedAssociatedWith?.id && 
					parsedAssociatedWith.id.trim() !== "" && 
					["post", "dish", "restaurant"].includes(parsedAssociatedWith.type)) {
					associatedWith = parsedAssociatedWith;
				} else {
					console.warn("Invalid associatedWith data:", parsedAssociatedWith);
				}
			} catch (error) {
				console.warn("Invalid associatedWith JSON:", req.body.associatedWith);
			}
		}

		// Always create media record in main backend to get a proper MongoDB ObjectId
		const mediaRecord: Record<string, unknown> = {
			...baseRecord,
			...(associatedWith && { associatedWith }),
		};
		const newMedia = await Media.create(mediaRecord);
		
		// Populate uploadedBy user data
		await newMedia.populate([
			{ path: "uploadedBy", select: "name username imageUrl" },
		]);

		// Transform to match UploadMediaResponse type (now just a Media object)
		const response: UploadMediaResponse = {
			_id: newMedia._id.toString(),
			url: uploadResult.media.variants?.[0]?.url || uploadResult.media.url,
			type: uploadResult.media.mimeType.startsWith("image/") ? "image" : "video",
			title: req.body.title || uploadResult.media.originalName,
			description: req.body.description || "",
			uploadedBy: {
				id: (newMedia.uploadedBy as { _id: string; name: string; username: string; imageUrl: string })._id.toString(),
				name: (newMedia.uploadedBy as { _id: string; name: string; username: string; imageUrl: string }).name,
				username: (newMedia.uploadedBy as { _id: string; name: string; username: string; imageUrl: string }).username,
				imageUrl: (newMedia.uploadedBy as { _id: string; name: string; username: string; imageUrl: string }).imageUrl,
			},
			associatedWith: associatedWith || undefined,
			verified: false,
			fileSize: uploadResult.media.fileSize,
			mimeType: uploadResult.media.mimeType,
			dimensions: uploadResult.media.width && uploadResult.media.height ? {
				width: uploadResult.media.width,
				height: uploadResult.media.height,
			} : undefined,
			providerId: uploadResult.media.providerId,
			provider: uploadResult.media.provider as "cloudinary" | "aws-s3",
			// Include advanced features
			variants: uploadResult.variants.map(variant => ({
				size: variant.size as "small" | "thumbnail" | "medium" | "large" | "original",
				url: variant.url,
				width: variant.width,
				height: variant.height,
				fileSize: variant.fileSize,
				format: variant.format,
				createdAt: new Date().toISOString()
			})),
			tags: uploadResult.media.tags || [],
			createdAt: uploadResult.media.createdAt,
			updatedAt: uploadResult.media.updatedAt,
		};

		res.status(201).json(response);
	} catch (error) {
		return next(error);
	}
};
