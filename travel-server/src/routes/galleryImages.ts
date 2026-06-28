import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { 
  getGalleryImages, 
  getGalleryImage, 
  createGalleryImage, 
  updateGalleryImage, 
  deleteGalleryImage 
} from '../controllers/galleryImages';

const router = express.Router();

router.get('/', getGalleryImages);
router.get('/:id', getGalleryImage);
router.post('/', authenticate, authorize('admin', 'editor'), createGalleryImage);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateGalleryImage);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteGalleryImage);

export default router;

