import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { 
  getHeroSliders, 
  getHeroSlider, 
  createHeroSlider, 
  updateHeroSlider, 
  deleteHeroSlider 
} from '../controllers/heroSliders';

const router = express.Router();

// Public routes
router.get('/', getHeroSliders);
router.get('/:id', getHeroSlider);

// Protected routes (require authentication)
router.post('/', authenticate, authorize('admin', 'editor'), createHeroSlider);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateHeroSlider);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteHeroSlider);

export default router;

