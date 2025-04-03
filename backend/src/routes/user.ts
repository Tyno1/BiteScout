import express from "express";
import { UpdateUser } from "../controllers/userController.js";

const router = express.Router();

router.put("/:userId", UpdateUser as any);

export default router;
