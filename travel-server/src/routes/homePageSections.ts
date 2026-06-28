import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { getHomePageSection, updateHomePageSection } from '../controllers/homePageSections';

const router = express.Router();

// Public routes
router.get('/:sectionKey', getHomePageSection);

// Protected routes (require authentication)
router.put('/:sectionKey', authenticate, authorize('admin', 'editor'), updateHomePageSection);

export default router;

