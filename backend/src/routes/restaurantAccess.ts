import express from "express";
import * as controller from "../controllers/restaurantAccess.js";

const router = express.Router();

//  set up middleware to make sure the request is made by owner

router.post("/:restaurantId", controller.RequestAuthorization);
router.get("/user/:userId", controller.GetRestaurantAccessByUserId);
router.get("/owner/:ownerId", controller.GetRestaurantAccessByOwnerId);
router.patch("/access/:accessId/grant", controller.GrantAccess);
router.patch("/access/:accessId/suspend", controller.SuspendAccess);
router.patch("/access/:accessId/delete", controller.DeleteAccess);
router.patch("/access/:accessId/update", controller.UpdateRole);

export default router;
