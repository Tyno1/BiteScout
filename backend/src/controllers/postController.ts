/// <reference path="../types/express.d.ts" />
import type { NextFunction, Request, Response } from "express";
import Post from "../models/Post.js";

// Helper function to validate request ID
const validateId = (req: Request) => {
	const { id } = req.params;
	if (!id) {
		throw new Error("No id provided");
	}
	return id;
};

export const createPost = async (
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

		// Add userId from authenticated user
		body.userId = req.user?.id;

		if (!body.userId) {
			res.status(401).json({ error: "User not authenticated" });
			return;
		}

		const newPost = await Post.create(body);

		if (!newPost) {
			res.status(400).json({ error: "Could not create post" });
			return;
		}

		// Populate user, restaurant, cuisine, course, allergen, foodCatalogue, and media data
		await newPost.populate([
			{ path: "userId", select: "name username imageUrl" },
			{ path: "location.restaurantId", select: "name" },
			{ path: "cuisine", select: "name" },
			{ path: "course", select: "name" },
			{ path: "allergens", select: "name" },
			{ path: "foodCatalogueId", select: "name ingredients" },
			{ path: "media", select: "url type verified uploadedBy" }
		]);

		res.status(201).json(newPost);
	} catch (error) {
		return next(error);
	}
};

export const getPostById = async (
	req: Request<{ id: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = validateId(req);

		const post = await Post.findById(id).populate([
			{ path: "userId", select: "name username imageUrl" },
			{ path: "location.restaurantId", select: "name" },
			{ path: "cuisine", select: "name" },
			{ path: "course", select: "name" },
			{ path: "allergens", select: "name" },
			{ path: "foodCatalogueId", select: "name ingredients" },
			{ path: "media", select: "url type verified uploadedBy" },
			{ path: "likes", select: "name username imageUrl" }
		]);

		if (!post) {
			res.status(404).json({ error: "Post not found" });
			return;
		}

		res.json(post);
	} catch (error) {
		return next(error);
	}
};

export const getAllPosts = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const {
			page = 1,
			limit = 10,
			cuisine,
			course,
			visibility = "public",
		} = req.query;

		const skip = (Number(page) - 1) * Number(limit);

		// Build filter object
		const filter: Record<string, unknown> = { visibility };

		if (cuisine) {
			filter.cuisine = cuisine;
		}

		if (course) {
			filter.course = course;
		}

		const posts = await Post.find(filter)
			.populate([
				{ path: "userId", select: "name username imageUrl" },
				{ path: "location.restaurantId", select: "name" },
				{ path: "cuisine", select: "name" },
				{ path: "course", select: "name" },
				{ path: "allergens", select: "name" },
				{ path: "foodCatalogueId", select: "name ingredients" },
				{ path: "media", select: "url type verified uploadedBy" }
			])
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(Number(limit));

		const total = await Post.countDocuments(filter);

		res.json({
			posts,
			pagination: {
				currentPage: Number(page),
				totalPages: Math.ceil(total / Number(limit)),
				totalPosts: total,
				hasNextPage: skip + posts.length < total,
				hasPrevPage: Number(page) > 1,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const getUserPosts = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { userId } = req.params;
		const { page = 1, limit = 10 } = req.query;

		const skip = (Number(page) - 1) * Number(limit);

		const posts = await Post.find({ userId })
			.populate([
				{ path: "userId", select: "name username imageUrl" },
				{ path: "location.restaurantId", select: "name" },
				{ path: "cuisine", select: "name" },
				{ path: "course", select: "name" },
				{ path: "allergens", select: "name" },
				{ path: "foodCatalogueId", select: "name ingredients" },
				{ path: "media", select: "url type verified uploadedBy" }
			])
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(Number(limit));

		const total = await Post.countDocuments({ userId });

		res.json({
			posts,
			pagination: {
				currentPage: Number(page),
				totalPages: Math.ceil(total / Number(limit)),
				totalPosts: total,
				hasNextPage: skip + posts.length < total,
				hasPrevPage: Number(page) > 1,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const getRestaurantPosts = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { restaurantId } = req.params;
		const { page = 1, limit = 10 } = req.query;

		const skip = (Number(page) - 1) * Number(limit);

		const posts = await Post.find({ "location.restaurantId": restaurantId })
			.populate([
				{ path: "userId", select: "name username imageUrl" },
				{ path: "location.restaurantId", select: "name" },
				{ path: "cuisine", select: "name" },
				{ path: "course", select: "name" },
				{ path: "allergens", select: "name" },
				{ path: "foodCatalogueId", select: "name ingredients" },
				{ path: "media", select: "url type verified uploadedBy" }
			])
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(Number(limit));

		const total = await Post.countDocuments({
			"location.restaurantId": restaurantId,
		});

		res.json({
			posts,
			pagination: {
				currentPage: Number(page),
				totalPages: Math.ceil(total / Number(limit)),
				totalPosts: total,
				hasNextPage: skip + posts.length < total,
				hasPrevPage: Number(page) > 1,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const updatePost = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { id } = req.params;
		const body = req.body;

		// Check if post exists and user owns it
		const existingPost = await Post.findById(id);
		if (!existingPost) {
			res.status(404).json({ error: "Post not found" });
			return;
		}

		if (existingPost.userId.toString() !== req.user?.id) {
			res.status(403).json({ error: "Not authorized to update this post" });
			return;
		}

		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ $set: body },
			{ new: true },
		).populate([
			{ path: "userId", select: "name username imageUrl" },
			{ path: "location.restaurantId", select: "name" },
			{ path: "cuisine", select: "name" },
			{ path: "course", select: "name" },
			{ path: "allergens", select: "name" },
			{ path: "foodCatalogueId", select: "name ingredients" },
			{ path: "media", select: "url type verified uploadedBy" }
		]);

		if (!updatedPost) {
			res.status(404).json({ error: "Post could not be updated" });
			return;
		}

		res.json(updatedPost);
	} catch (error) {
		return next(error);
	}
};

export const deletePost = async (
	req: Request<{ id: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = validateId(req);

		// Check if post exists and user owns it
		const existingPost = await Post.findById(id);
		if (!existingPost) {
			res.status(404).json({ error: "Post not found" });
			return;
		}

		if (existingPost.userId.toString() !== req.user?.id) {
			res.status(403).json({ error: "Not authorized to delete this post" });
			return;
		}

		await Post.findByIdAndDelete(id);

		res.status(200).json({
			message: "Post deleted successfully",
		});
	} catch (error) {
		return next(error);
	}
};

export const likePost = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { id } = req.params;
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ error: "User not authenticated" });
			return;
		}

		const post = await Post.findById(id);
		if (!post) {
			res.status(404).json({ error: "Post not found" });
			return;
		}

		const isLiked = post.likes.includes(userId);

		if (isLiked) {
			// Unlike the post
			post.likes = post.likes.filter((likeId: string) => likeId.toString() !== userId);
		} else {
			// Like the post
			post.likes.push(userId);
		}

		await post.save();

		await post.populate([
			{ path: "userId", select: "name username imageUrl" },
			{ path: "location.restaurantId", select: "name" },
			{ path: "cuisine", select: "name" },
			{ path: "course", select: "name" },
			{ path: "allergens", select: "name" },
			{ path: "foodCatalogueId", select: "name ingredients" },
			{ path: "media", select: "url type verified uploadedBy" },
			{ path: "likes", select: "name username imageUrl" }
		]);

		res.json({
			post,
			liked: !isLiked,
			likeCount: post.likes.length,
		});
	} catch (error) {
		return next(error);
	}
};

export const searchPosts = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { q, page = 1, limit = 10 } = req.query;

		if (!q) {
			res.status(400).json({ error: "Search query is required" });
			return;
		}

		const skip = (Number(page) - 1) * Number(limit);

		const searchRegex = new RegExp(String(q), "i");

		const posts = await Post.find({
			$or: [
				{ foodName: searchRegex },
				{ caption: searchRegex },
				{ tags: searchRegex }
			],
			visibility: "public"
		})
			.populate([
				{ path: "userId", select: "name username imageUrl" },
				{ path: "location.restaurantId", select: "name" },
				{ path: "cuisine", select: "name" },
				{ path: "course", select: "name" },
				{ path: "allergens", select: "name" },
				{ path: "foodCatalogueId", select: "name ingredients" },
				{ path: "media", select: "url type verified uploadedBy" }
			])
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(Number(limit));

		const total = await Post.countDocuments({
			$or: [
				{ foodName: searchRegex },
				{ caption: searchRegex },
				{ tags: searchRegex }
			],
			visibility: "public"
		});

		res.json({
			posts,
			pagination: {
				currentPage: Number(page),
				totalPages: Math.ceil(total / Number(limit)),
				totalPosts: total,
				hasNextPage: skip + posts.length < total,
				hasPrevPage: Number(page) > 1,
			},
		});
	} catch (error) {
		next(error);
	}
};
