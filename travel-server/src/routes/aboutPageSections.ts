import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { getAboutPageSection, updateAboutPageSection } from '../controllers/aboutPageSections';

const router = express.Router();

router.get('/:sectionKey', getAboutPageSection);
router.put('/:sectionKey', authenticate, authorize('admin', 'editor'), updateAboutPageSection);

export default router;

