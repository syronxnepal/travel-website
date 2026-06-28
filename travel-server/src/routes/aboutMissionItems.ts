import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { 
  getAboutMissionItems, 
  getAboutMissionItem, 
  createAboutMissionItem, 
  updateAboutMissionItem, 
  deleteAboutMissionItem 
} from '../controllers/aboutMissionItems';

const router = express.Router();

router.get('/', getAboutMissionItems);
router.get('/:id', getAboutMissionItem);
router.post('/', authenticate, authorize('admin', 'editor'), createAboutMissionItem);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateAboutMissionItem);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteAboutMissionItem);

export default router;

