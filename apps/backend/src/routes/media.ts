import express from 'express';
import multer from 'multer';
import * as mediaController from '../controllers/mediaController.js';
import authMiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images and videos
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  },
});

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Media metadata management
router.post('/', mediaController.createMedia);
router.get('/verified', mediaController.getVerifiedMedia);
router.get('/:id', mediaController.getMediaById);
router.put('/:id', mediaController.updateMedia);
router.delete('/:id', mediaController.deleteMedia);
router.get('/associated/:type/:id', mediaController.getMediaByAssociatedItem);
router.get('/user/:userId', mediaController.getUserMedia);
router.patch('/:id/verify', mediaController.verifyMedia);

// File upload (delegates to media service)
router.post('/upload', upload.single('file'), mediaController.uploadFile);

export default router; 