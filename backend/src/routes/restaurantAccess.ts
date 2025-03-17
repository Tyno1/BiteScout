import express from "express";
import * as controller from "../controllers/restaurantAccess.js";

const router = express.Router();

router.post("/:restaurantId", controller.RequestAuthorization);

export default router;
