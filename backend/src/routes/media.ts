import express from "express";
import * as controller from "../controllers/mediaController.js";

const router = express.Router();

// Create new media
router.post("/", controller.createMedia);

// Get media by ID
router.get("/:id", controller.getMediaById);

// Get media by associated item (post or dish)
router.get("/associated/:type/:id", controller.getMediaByAssociatedItem);

// Get user's media
router.get("/user/:userId", controller.getUserMedia);

// Get verified media
router.get("/verified", controller.getVerifiedMedia);

// Update media
router.put("/:id", controller.updateMedia);

// Delete media
router.delete("/:id", controller.deleteMedia);

// Verify/unverify media (admin/moderator only)
router.patch("/:id/verify", controller.verifyMedia);

export default router; 