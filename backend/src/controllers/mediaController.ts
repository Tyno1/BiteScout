import type { NextFunction, Request, Response } from "express";
import Media from "../models/Media.js";

// Helper function to validate request ID
const validateId = (req: Request) => {
	const { id } = req.params;
	if (!id) {
		throw new Error("No id provided");
	}
	return id;
};

export const createMedia = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const body = req.body;

		if (!body) {
			res.status(400).json({ error: "Invalid request body" });
			return;
		}

		// Add uploadedBy from authenticated user
		body.uploadedBy = req.user?.id;

		if (!body.uploadedBy) {
			res.status(401).json({ error: "User not authenticated" });
			return;
		}

		const newMedia = await Media.create(body);

		if (!newMedia) {
			res.status(400).json({ error: "Could not create media" });
			return;
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
	req: Request<{ id: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = validateId(req);

		const media = await Media.findById(id).populate([
			{ path: "uploadedBy", select: "name username imageUrl" },
		]);

		if (!media) {
			res.status(404).json({ error: "Media not found" });
			return;
		}

		res.json(media);
	} catch (error) {
		return next(error);
	}
};

export const getMediaByAssociatedItem = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { type, id } = req.params;

		if (!type || !id) {
			res.status(400).json({ error: "Type and ID are required" });
			return;
		}

		if (!["post", "dish"].includes(type)) {
			res.status(400).json({ error: "Invalid type. Must be 'post' or 'dish'" });
			return;
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
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { userId } = req.params;
		const { page = 1, limit = 10 } = req.query;

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
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { id } = req.params;
		const body = req.body;

		// Check if media exists and user owns it
		const existingMedia = await Media.findById(id);
		if (!existingMedia) {
			res.status(404).json({ error: "Media not found" });
			return;
		}

		if (existingMedia.uploadedBy.toString() !== req.user?.id) {
			res.status(403).json({ error: "Not authorized to update this media" });
			return;
		}

		const updatedMedia = await Media.findByIdAndUpdate(
			id,
			{ $set: body },
			{ new: true },
		).populate([{ path: "uploadedBy", select: "name username imageUrl" }]);

		if (!updatedMedia) {
			res.status(404).json({ error: "Media could not be updated" });
			return;
		}

		res.json(updatedMedia);
	} catch (error) {
		return next(error);
	}
};

export const deleteMedia = async (
	req: Request<{ id: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = validateId(req);

		// Check if media exists and user owns it
		const existingMedia = await Media.findById(id);
		if (!existingMedia) {
			res.status(404).json({ error: "Media not found" });
			return;
		}

		if (existingMedia.uploadedBy.toString() !== req.user?.id) {
			res.status(403).json({ error: "Not authorized to delete this media" });
			return;
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
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { id } = req.params;
		const { verified } = req.body;

		// Only admins/moderators can verify media
		if (req.user?.userType !== "admin" && req.user?.userType !== "moderator") {
			res.status(403).json({ error: "Not authorized to verify media" });
			return;
		}

		const media = await Media.findById(id);
		if (!media) {
			res.status(404).json({ error: "Media not found" });
			return;
		}

		media.verified = verified;
		await media.save();

		await media.populate([
			{ path: "uploadedBy", select: "name username imageUrl" },
		]);

		res.json({
			media,
			message: `Media ${verified ? "verified" : "unverified"} successfully`,
		});
	} catch (error) {
		return next(error);
	}
};

export const getVerifiedMedia = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { page = 1, limit = 10, type } = req.query;

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
