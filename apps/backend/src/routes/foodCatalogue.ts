import express from "express";
import * as controller from "../controllers/foodCatalogueController.js";

const router = express.Router();

// Test endpoint (can be removed in production)
router.get("/test", controller.testSearch);

// Food search endpoint (cross-restaurant search)
router.get("/search", controller.searchFoodCatalogue);

// Restaurant-specific food catalogue endpoints
router.get("/restaurant/:restaurantId/catalogue/:foodId", controller.getFoodCatalogueById);
router.get("/restaurant/:restaurantId", controller.getFoodCatalogueByRestaurantId);
router.post("/", controller.createFoodCatalogue);
router.put("/restaurant/:restaurantId/catalogue/:foodId", controller.updateFoodCatalogue);
router.delete("/restaurant/:restaurantId/catalogue/:foodId", controller.deleteFoodCatalogue);

export default router;
