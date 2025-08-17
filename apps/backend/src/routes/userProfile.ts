import express from "express";
import { 
  changePassword, 
  getUserProfile, 
  updateUserProfile 
} from "../controllers/userProfileController.js";

const router = express.Router();

// User profile routes (users can only access their own profile)
router.get("/:userId", getUserProfile);
router.put("/:userId", updateUserProfile);
router.patch("/:userId/password", changePassword);

export default router;
