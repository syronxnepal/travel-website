import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { getContactPageSection, updateContactPageSection } from '../controllers/contactPageSections';

const router = express.Router();

router.get('/:sectionKey', getContactPageSection);
router.put('/:sectionKey', authenticate, authorize('admin', 'editor'), updateContactPageSection);

export default router;

