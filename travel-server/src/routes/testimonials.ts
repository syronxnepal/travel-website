import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { 
  getTestimonials, 
  getTestimonial, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial 
} from '../controllers/testimonials';

const router = express.Router();

router.get('/', getTestimonials);
router.get('/:id', getTestimonial);
router.post('/', authenticate, authorize('admin', 'editor'), createTestimonial);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateTestimonial);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteTestimonial);

export default router;

