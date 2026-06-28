import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
  hardDeleteMedia
} from '../controllers/media';

const router = express.Router();

// Get all media (with search, filter, pagination)
router.get('/', authenticate, authorize('admin', 'editor'), getMedia);

// Get single media item
router.get('/:id', authenticate, authorize('admin', 'editor'), getMediaById);

// Create media item (usually called after file upload)
router.post('/', authenticate, authorize('admin', 'editor'), createMedia);

// Update media item metadata
router.put('/:id', authenticate, authorize('admin', 'editor'), updateMedia);

// Soft delete media item
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteMedia);

// Hard delete media item (permanently delete)
router.delete('/:id/hard', authenticate, authorize('admin', 'editor'), hardDeleteMedia);

export default router;

