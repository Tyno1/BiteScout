import express from "express";
import * as controller from "../controllers/postController.js";

const router = express.Router();

// Create a new post
router.post("/", controller.createPost);

// Get all posts
router.get("/", controller.getAllPosts);

// Get post by ID
router.get("/:id", controller.getPostById);

// Update post
router.put("/:id", controller.updatePost);

// Delete post
router.delete("/:id", controller.deletePost);

// Like/unlike post
router.post("/:id/like", controller.likePost);

// Tag food in post
router.post("/:postId/tag-food", controller.tagFoodInPost);

// Remove food tag from post
router.delete("/:postId/tag-food/:foodCatalogueId", controller.removeFoodTag);

// Get posts by user
router.get("/user/:userId", controller.getUserPosts);

// Get posts by restaurant
router.get("/restaurant/:restaurantId", controller.getRestaurantPosts);

// Get posts by food catalogue item
router.get("/food/:foodCatalogueId", controller.getFoodPosts);

// Search posts
router.get("/search", controller.searchPosts);

export default router; 