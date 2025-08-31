import express from "express";
import * as controller from "../controllers/restaurantController.js";

const router = express.Router();

router.post("/", controller.createNewRestaurant);
router.get("/", controller.getAllRestaurants);
router.get("/owner/:userId", controller.getRestaurantByOwnerId);
router.get("/owner-restaurants/:userId", controller.getOwnerRestaurants);
router.get("/search/:name", controller.getRestaurantsByName);
router.get("/filter", controller.filterRestaurants);
router.get("/:id", controller.getRestaurantById);
router.put("/:id", controller.updateRestaurantData);
router.put("/:id/assigned-images", controller.updateAssignedImages);
router.delete("/:id", controller.deletedRestaurant);

// Delivery link routes
router.get("/:id/delivery-links", controller.getDeliveryLinks);
router.post("/:id/delivery-links", controller.addDeliveryLink);
router.put("/:id/delivery-links/:linkId", controller.updateDeliveryLink);
router.delete("/:id/delivery-links/:linkId", controller.deleteDeliveryLink);

export default router;
