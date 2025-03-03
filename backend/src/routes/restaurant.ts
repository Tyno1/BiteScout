import express from "express";
import * as controller from "../controllers/restaurantController.js";

const router = express.Router();

router.post("/", controller.createNewRestaurant);
router.get("/", controller.getAllRestaurants);
router.get("/:id", controller.getRestaurantById);
router.put("/:id", controller.updateRestaurantData);
router.delete("/:id", controller.deletedRestaurant);

export default router;
