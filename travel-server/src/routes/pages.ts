import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { 
  getPages, 
  getPage, 
  getPageByType,
  createPage, 
  updatePage, 
  deletePage 
} from '../controllers/pages';

const router = express.Router();

// Public routes
router.get('/', getPages);
router.get('/type/:pageType', getPageByType);
router.get('/:id', getPage);

// Protected routes (require authentication)
router.post('/', authenticate, authorize('admin', 'editor'), createPage);
router.put('/:id', authenticate, authorize('admin', 'editor'), updatePage);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deletePage);

export default router;

