import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { 
  getBlogCategories, 
  getBlogCategory, 
  createBlogCategory, 
  updateBlogCategory, 
  deleteBlogCategory 
} from '../controllers/blogCategories';

const router = express.Router();

// Public routes
router.get('/', getBlogCategories);
router.get('/:id', getBlogCategory);

// Protected routes (require authentication)
router.post('/', authenticate, authorize('admin', 'editor'), createBlogCategory);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateBlogCategory);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteBlogCategory);

export default router;

