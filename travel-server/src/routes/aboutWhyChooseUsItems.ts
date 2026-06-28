import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { 
  getAboutWhyChooseUsItems, 
  getAboutWhyChooseUsItem, 
  createAboutWhyChooseUsItem, 
  updateAboutWhyChooseUsItem, 
  deleteAboutWhyChooseUsItem 
} from '../controllers/aboutWhyChooseUsItems';

const router = express.Router();

router.get('/', getAboutWhyChooseUsItems);
router.get('/:id', getAboutWhyChooseUsItem);
router.post('/', authenticate, authorize('admin', 'editor'), createAboutWhyChooseUsItem);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateAboutWhyChooseUsItem);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteAboutWhyChooseUsItem);

export default router;

