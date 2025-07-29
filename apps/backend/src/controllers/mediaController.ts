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
	GetVerifiedMediaRequest,
	GetVerifiedMediaResponse,
	Media as MediaType,
	UpdateMediaRequest,
	UpdateMediaResponse,
	VerifyMediaRequest,
	VerifyMediaResponse
} from "shared/types";
import { mediaServiceClient } from "../clients/mediaServiceClient.js";
import { createError } from "../middleware/errorHandler.js";
import Media from "../models/Media.js";

// Combined response types for each endpoint
type CreateMediaApiResponse = CreateMediaResponse | ApiError;
type GetMediaApiResponse = GetMediaResponse | ApiError;
type UpdateMediaApiResponse = UpdateMediaResponse | ApiError;
type DeleteMediaApiResponse = DeleteMediaResponse | ApiError;
type GetMediaByAssociatedApiResponse = GetMediaByAssociatedResponse | ApiError;
type GetUserMediaApiResponse = GetUserMediaResponse | ApiError;
type VerifyMediaApiResponse = VerifyMediaResponse | ApiError;
type GetVerifiedMediaApiResponse = GetVerifiedMediaResponse | ApiError;

// Helper function to validate request ID
const validateId = (req: Request) => {
	const { id } = req.params;
	if (!id) {
		throw createError(400, "No id provided");
	}
	return id;
};

export const createMedia = async (
	req: Request<Record<string, never>, CreateMediaApiResponse, CreateMediaRequest>,
	res: Response<CreateMediaApiResponse>,
	next: NextFunction,
): Promise<void> => {
	try {
		const body = req.body;

		if (!body) {
			throw createError(400, "Invalid request body");
		}

		// Add uploadedBy from authenticated user
		const mediaData = { ...body, uploadedBy: req.user?.id };

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

		res.status(201).json(newMedia);
	} catch (error) {
		return next(error);
	}
};

export const getMediaById = async (
	req: Request<GetMediaRequest, GetMediaApiResponse>,
	res: Response<GetMediaApiResponse>,
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

		res.json(media);
	} catch (error) {
		return next(error);
	}
};

export const getMediaByAssociatedItem = async (
	req: Request<GetMediaByAssociatedRequest, GetMediaByAssociatedApiResponse>,
	res: Response<GetMediaByAssociatedApiResponse>,
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

		res.json(media);
	} catch (error) {
		next(error);
	}
};

export const getUserMedia = async (
	req: Request<{ userId: string }, GetUserMediaApiResponse, Record<string, never>, { page?: string; limit?: string }>,
	res: Response<GetUserMediaApiResponse>,
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

		res.json({
			media,
			pagination: {
				currentPage: Number(page),
				totalPages: Math.ceil(total / Number(limit)),
				totalMedia: total,
				hasNextPage: skip + media.length < total,
				hasPrevPage: Number(page) > 1,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const updateMedia = async (
	req: Request<{ id: string }, UpdateMediaApiResponse, UpdateMediaRequest>,
	res: Response<UpdateMediaApiResponse>,
	next: NextFunction,
): Promise<void> => {
	try {
		const { id } = req.params;
		const body = req.body;

		// Check if media exists and user owns it
		const existingMedia = await Media.findById(id);
		if (!existingMedia) {
			throw createError(404, "Media not found");
		}

		if (existingMedia.uploadedBy.toString() !== req.user?.id) {
			throw createError(403, "Not authorized to update this media");
		}

		const updatedMedia = await Media.findByIdAndUpdate(
			id,
			{ $set: body },
			{ new: true },
		).populate([{ path: "uploadedBy", select: "name username imageUrl" }]);

		if (!updatedMedia) {
			throw createError(404, "Media could not be updated");
		}

		res.json(updatedMedia);
	} catch (error) {
		return next(error);
	}
};

export const deleteMedia = async (
	req: Request<DeleteMediaRequest, DeleteMediaApiResponse>,
	res: Response<DeleteMediaApiResponse>,
	next: NextFunction,
) => {
	try {
		const id = validateId(req);

		// Check if media exists and user owns it
		const existingMedia = await Media.findById(id);
		if (!existingMedia) {
			throw createError(404, "Media not found");
		}

		if (existingMedia.uploadedBy.toString() !== req.user?.id) {
			throw createError(403, "Not authorized to delete this media");
		}

		await Media.findByIdAndDelete(id);

		res.status(200).json({
			message: "Media deleted successfully",
		});
	} catch (error) {
		return next(error);
	}
};

export const verifyMedia = async (
	req: Request<{ id: string }, VerifyMediaApiResponse>,
	res: Response<VerifyMediaApiResponse>,
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

		res.json(media);
	} catch (error) {
		return next(error);
	}
};

export const getVerifiedMedia = async (
	req: Request<Record<string, never>, GetVerifiedMediaApiResponse, Record<string, never>, { page?: string; limit?: string; type?: string }>,
	res: Response<GetVerifiedMediaApiResponse>,
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

		res.json({
			media,
			pagination: {
				currentPage: Number(page),
				totalPages: Math.ceil(total / Number(limit)),
				totalMedia: total,
				hasNextPage: skip + media.length < total,
				hasPrevPage: Number(page) > 1,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const uploadFile = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		if (!req.file) {
			throw createError(400, "No file uploaded");
		}

		if (!req.user?.id) {
			throw createError(401, "User not authenticated");
		}

		// Upload file to media service
		const uploadResult = await mediaServiceClient.uploadFile(req.file, {
			userId: req.user.id,
			tags: req.body.tags ? JSON.parse(req.body.tags) : undefined,
			folder: req.body.folder,
		});

		// Create media record in main backend
		const mediaRecord = {
			url: uploadResult.media.url,
			type: uploadResult.media.mimeType.startsWith("image/") ? "image" : "video",
			title: req.body.title || uploadResult.media.originalName,
			description: req.body.description || "",
			uploadedBy: req.user.id,
			verified: false,
			fileSize: uploadResult.media.fileSize,
			mimeType: uploadResult.media.mimeType,
			dimensions: uploadResult.media.width && uploadResult.media.height ? {
				width: uploadResult.media.width,
				height: uploadResult.media.height,
			} : undefined,
			associatedWith: req.body.associatedWith ? JSON.parse(req.body.associatedWith) : undefined,
		};

		const newMedia = await Media.create(mediaRecord);

		// Populate uploadedBy user data
		await newMedia.populate([
			{ path: "uploadedBy", select: "name username imageUrl" },
		]);

		// Return response with populated user data and variants from media service
		res.status(201).json({
			media: newMedia,
			variants: uploadResult.variants,
		});
	} catch (error) {
		return next(error);
	}
};
