import express from "express";
import * as auth from "../controllers/authController.js";

const router = express.Router();

router.post("/login", auth.login);
router.post("/register", auth.register);
router.post("/refresh", auth.refresh);

export default router;
