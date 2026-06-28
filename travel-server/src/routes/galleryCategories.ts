import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { 
  getGalleryCategories, 
  getGalleryCategory, 
  createGalleryCategory, 
  updateGalleryCategory, 
  deleteGalleryCategory 
} from '../controllers/galleryCategories';

const router = express.Router();

router.get('/', getGalleryCategories);
router.get('/:id', getGalleryCategory);
router.post('/', authenticate, authorize('admin', 'editor'), createGalleryCategory);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateGalleryCategory);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteGalleryCategory);

export default router;

