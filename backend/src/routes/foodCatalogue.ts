import express from "express";
import * as controller from "../controllers/foodCatalogueController.js";

const router = express.Router();

// edit route and controller to match requests from frontend
router.get("/restaurant/:restaurantId/catalogue/:foodId", controller.getFoodCatalogueById);
router.get("/restaurant/:restaurantId", controller.getFoodCatalogueByRestaurantId);
router.post("/", controller.createFoodCatalogue);
router.put("/restaurant/:restaurantId/catalogue/:foodId", controller.updateFoodCatalogue);
router.delete("restaurant/:restaurantId/catalogue/:foodId", controller.deleteFoodCatalogue);

export default router;
