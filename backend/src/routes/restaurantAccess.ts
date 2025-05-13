import express from "express";
import * as controller from "../controllers/restaurantAccess.js";

const router = express.Router();

router.post("/:restaurantId", controller.RequestAuthorization);
router.get("/user/:userId", controller.GetRestaurantAccessByUserId);

export default router;
