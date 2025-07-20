import type { NextFunction, Request, Response } from "express";
import Review from "../models/Review.js";

// Helper function to validate request ID
const validateId = (req: Request) => {
	const { id } = req.params;
	if (!id) {
		throw new Error("No id provided");
	}
	return id;
};

export const createReview = async (
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

		// Check for existing review by same user for same item
		const existingReview = await Review.findOne({
			userId: body.userId,
			restaurantId: body.restaurantId,
			foodCatalogueId: body.foodCatalogueId || null,
		});

		if (existingReview) {
			res.status(409).json({
				error: "You have already reviewed this item",
				existingReviewId: existingReview._id,
			});
			return;
		}

		// Remove _id from body to prevent validation errors
		const { _id, ...reviewData } = body;
		const newReview = await Review.create(reviewData);

		if (!newReview) {
			res.status(400).json({ error: "Could not create review" });
			return;
		}

		// Populate user, restaurant, and food catalogue data
		await newReview.populate([
			{ path: "userId", select: "name username imageUrl" },
			{ path: "restaurantId", select: "name" },
			{ path: "foodCatalogueId", select: "name ingredients" },
		]);

		res.status(201).json(newReview);
	} catch (error) {
		return next(error);
	}
};

export const getReviewById = async (
	req: Request<{ id: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = validateId(req);

		const review = await Review.findById(id).populate([
			{ path: "userId", select: "name username imageUrl" },
			{ path: "restaurantId", select: "name" },
			{ path: "foodCatalogueId", select: "name ingredients" },
		]);

		if (!review) {
			res.status(404).json({ error: "Review not found" });
			return;
		}

		res.json(review);
	} catch (error) {
		return next(error);
	}
};

export const getRestaurantReviews = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { restaurantId } = req.params;
		const { page = 1, limit = 10, rating, foodCatalogueId } = req.query;

		const skip = (Number(page) - 1) * Number(limit);

		// Build filter object
		const filter: Record<string, unknown> = { restaurantId };

		if (rating) {
			filter.rating = Number(rating);
		}

		if (foodCatalogueId) {
			filter.foodCatalogueId = foodCatalogueId;
		}

		const reviews = await Review.find(filter)
			.populate([
				{ path: "userId", select: "name username imageUrl" },
				{ path: "restaurantId", select: "name" },
				{ path: "foodCatalogueId", select: "name ingredients" },
			])
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(Number(limit));

		const total = await Review.countDocuments(filter);

		// Calculate average rating
		const avgRating = await Review.aggregate([
			{ $match: filter },
			{ $group: { _id: null, avgRating: { $avg: "$rating" } } },
		]);

		res.json({
			reviews,
			averageRating:
				avgRating.length > 0 ? Math.round(avgRating[0].avgRating * 10) / 10 : 0,
			pagination: {
				currentPage: Number(page),
				totalPages: Math.ceil(total / Number(limit)),
				totalReviews: total,
				hasNextPage: skip + reviews.length < total,
				hasPrevPage: Number(page) > 1,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const getFoodCatalogueReviews = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { foodCatalogueId } = req.params;
		const { page = 1, limit = 10, rating } = req.query;

		const skip = (Number(page) - 1) * Number(limit);

		// Build filter object
		const filter: Record<string, unknown> = { foodCatalogueId };

		if (rating) {
			filter.rating = Number(rating);
		}

		const reviews = await Review.find(filter)
			.populate([
				{ path: "userId", select: "name username imageUrl" },
				{ path: "restaurantId", select: "name" },
				{ path: "foodCatalogueId", select: "name ingredients" },
			])
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(Number(limit));

		const total = await Review.countDocuments(filter);

		// Calculate average rating
		const avgRating = await Review.aggregate([
			{ $match: filter },
			{ $group: { _id: null, avgRating: { $avg: "$rating" } } },
		]);

		res.json({
			reviews,
			averageRating:
				avgRating.length > 0 ? Math.round(avgRating[0].avgRating * 10) / 10 : 0,
			pagination: {
				currentPage: Number(page),
				totalPages: Math.ceil(total / Number(limit)),
				totalReviews: total,
				hasNextPage: skip + reviews.length < total,
				hasPrevPage: Number(page) > 1,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const getUserReviews = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { userId } = req.params;
		const { page = 1, limit = 10 } = req.query;

		const skip = (Number(page) - 1) * Number(limit);

		const reviews = await Review.find({ userId })
			.populate([
				{ path: "userId", select: "name username imageUrl" },
				{ path: "restaurantId", select: "name" },
				{ path: "foodCatalogueId", select: "name ingredients" },
			])
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(Number(limit));

		const total = await Review.countDocuments({ userId });

		res.json({
			reviews,
			pagination: {
				currentPage: Number(page),
				totalPages: Math.ceil(total / Number(limit)),
				totalReviews: total,
				hasNextPage: skip + reviews.length < total,
				hasPrevPage: Number(page) > 1,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const updateReview = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { id } = req.params;
		const body = req.body;

		// Check if review exists and user owns it
		const existingReview = await Review.findById(id);
		if (!existingReview) {
			res.status(404).json({ error: "Review not found" });
			return;
		}

		if (existingReview.userId.toString() !== req.user?.id) {
			res.status(403).json({ error: "Not authorized to update this review" });
			return;
		}

		const updatedReview = await Review.findByIdAndUpdate(
			id,
			{ $set: body },
			{ new: true },
		).populate([
			{ path: "userId", select: "name username imageUrl" },
			{ path: "restaurantId", select: "name" },
			{ path: "foodCatalogueId", select: "name ingredients" },
		]);

		if (!updatedReview) {
			res.status(404).json({ error: "Review could not be updated" });
			return;
		}

		res.json(updatedReview);
	} catch (error) {
		return next(error);
	}
};

export const deleteReview = async (
	req: Request<{ id: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = validateId(req);

		// Check if review exists and user owns it
		const existingReview = await Review.findById(id);
		if (!existingReview) {
			res.status(404).json({ error: "Review not found" });
			return;
		}

		if (existingReview.userId.toString() !== req.user?.id) {
			res.status(403).json({ error: "Not authorized to delete this review" });
			return;
		}

		await Review.findByIdAndDelete(id);

		res.status(200).json({
			message: "Review deleted successfully",
		});
	} catch (error) {
		return next(error);
	}
};

export const getReviewStats = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { restaurantId, foodCatalogueId } = req.params;

		const filter: Record<string, unknown> = {};

		if (restaurantId) {
			filter.restaurantId = restaurantId;
		}

		if (foodCatalogueId) {
			filter.foodCatalogueId = foodCatalogueId;
		}

		const stats = await Review.aggregate([
			{ $match: filter },
			{
				$group: {
					_id: null,
					totalReviews: { $sum: 1 },
					averageRating: { $avg: "$rating" },
					ratingDistribution: {
						$push: "$rating",
					},
				},
			},
			{
				$project: {
					_id: 0,
					totalReviews: 1,
					averageRating: { $round: ["$averageRating", 1] },
					ratingDistribution: {
						"1": {
							$size: {
								$filter: {
									input: "$ratingDistribution",
									cond: { $eq: ["$$this", 1] },
								},
							},
						},
						"2": {
							$size: {
								$filter: {
									input: "$ratingDistribution",
									cond: { $eq: ["$$this", 2] },
								},
							},
						},
						"3": {
							$size: {
								$filter: {
									input: "$ratingDistribution",
									cond: { $eq: ["$$this", 3] },
								},
							},
						},
						"4": {
							$size: {
								$filter: {
									input: "$ratingDistribution",
									cond: { $eq: ["$$this", 4] },
								},
							},
						},
						"5": {
							$size: {
								$filter: {
									input: "$ratingDistribution",
									cond: { $eq: ["$$this", 5] },
								},
							},
						},
					},
				},
			},
		]);

		res.json(
			stats[0] || {
				totalReviews: 0,
				averageRating: 0,
				ratingDistribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
			},
		);
	} catch (error) {
		next(error);
	}
};

export const getUserReviewForItem = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { restaurantId, foodCatalogueId } = req.params;
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ error: "User not authenticated" });
			return;
		}

		const filter: Record<string, unknown> = {
			userId,
			restaurantId,
		};

		if (foodCatalogueId) {
			filter.foodCatalogueId = foodCatalogueId;
		}

		const review = await Review.findOne(filter).populate([
			{ path: "userId", select: "name username imageUrl" },
			{ path: "restaurantId", select: "name" },
			{ path: "foodCatalogueId", select: "name ingredients" },
		]);

		res.json({ review });
	} catch (error) {
		next(error);
	}
};
