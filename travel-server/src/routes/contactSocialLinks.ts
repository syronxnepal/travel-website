import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { 
  getContactSocialLinks, 
  getContactSocialLink, 
  createContactSocialLink, 
  updateContactSocialLink, 
  deleteContactSocialLink 
} from '../controllers/contactSocialLinks';

const router = express.Router();

router.get('/', getContactSocialLinks);
router.get('/:id', getContactSocialLink);
router.post('/', authenticate, authorize('admin', 'editor'), createContactSocialLink);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateContactSocialLink);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteContactSocialLink);

export default router;

