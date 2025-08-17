import express from "express";
import { 
  deleteUser, 
  getAllUsers, 
  getUserById, 
  getUserStats, 
  updateUser 
} from "../controllers/userManagementController.js";

const router = express.Router();

// User management routes (admin only)
router.get("/", getAllUsers);
router.get("/stats", getUserStats);
router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
// Note: User status changes are handled by RestaurantAccess controller

export default router;
