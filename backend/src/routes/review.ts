import express from "express";
import * as controller from "../controllers/reviewController.js";

const router = express.Router();

// Create new review
router.post("/", controller.createReview);

// Get review statistics (must come before /:id route)
router.get("/stats/restaurant/:restaurantId", controller.getReviewStats);
router.get("/stats/restaurant/:restaurantId/dish/:foodCatalogueId", controller.getReviewStats);

// Get user's review for specific item (must come before /:id route)
router.get("/user-review/restaurant/:restaurantId", controller.getUserReviewForItem);
router.get("/user-review/restaurant/:restaurantId/dish/:foodCatalogueId", controller.getUserReviewForItem);

// Get reviews by restaurant
router.get("/restaurant/:restaurantId", controller.getRestaurantReviews);

// Get reviews by food catalogue item
router.get("/dish/:foodCatalogueId", controller.getFoodCatalogueReviews);

// Get user's reviews
router.get("/user/:userId", controller.getUserReviews);

// Get specific review by ID
router.get("/:id", controller.getReviewById);

// Update review
router.put("/:id", controller.updateReview);

// Delete review
router.delete("/:id", controller.deleteReview);

export default router;
