import express from "express";
import * as mediaController from "../controllers/mediaController.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Media CRUD operations
router.post('/', mediaController.createMedia);
router.get('/verified', mediaController.getVerifiedMedia);
router.get('/user/:userId', mediaController.getUserMedia);
router.get('/associated/:type/:id', mediaController.getMediaByAssociatedItem);
router.get('/:id', mediaController.getMediaById);
router.put('/:id', mediaController.updateMedia);
router.delete('/:id', mediaController.deleteMedia);
router.patch('/:id/verify', mediaController.verifyMedia);

export default router; 