import express from "express";
import * as controller from "../controllers/foodCatalogueController.js";

const router = express.Router();

router.get("/:id", controller.getFoodCatalogueById);
router.get("/restaurant/:restaurantId", controller.getFoodCatalogueByRestaurantId);
router.post("/", controller.createFoodCatalogue);
router.put("/:id", controller.updateFoodCatalogue);
router.delete("/:id", controller.deleteFoodCatalogue);

export default router;
