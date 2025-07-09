import express from "express";
import * as controller from "../controllers/postController.js";

const router = express.Router();

// Create a new post
router.post("/", controller.createPost);

// Get all posts with pagination and filtering
router.get("/", controller.getAllPosts);

// Search posts (must come before /:id route)
router.get("/search", controller.searchPosts);

// Get posts by user
router.get("/user/:userId", controller.getUserPosts);

// Get posts by restaurant
router.get("/restaurant/:restaurantId", controller.getRestaurantPosts);

// Like/unlike a post (must come before /:id route)
router.post("/:id/like", controller.likePost);

// Get a specific post by ID
router.get("/:id", controller.getPostById);

// Update a post
router.put("/:id", controller.updatePost);

// Delete a post
router.delete("/:id", controller.deletePost);

export default router; 