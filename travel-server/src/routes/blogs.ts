import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } from '../controllers/blogs';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/:id', getBlog);

// Protected routes (require authentication)
router.post('/', authenticate, authorize('admin', 'editor'), createBlog);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateBlog);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteBlog);

export default router;

