import express from "express";
import * as userType from "../controllers/userTypeController.js";

const router = express.Router();

router.get("/:userTypeId", userType.getUserTypeById as any);

export default router;
