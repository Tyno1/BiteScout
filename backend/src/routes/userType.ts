import express from "express";
import * as userType from "../controllers/userTypeController.js";

const router = express.Router();

router.get("/:userType", userType.getUserTypeByName as any);

export default router;
