import express from 'express';
import { 
  getShortTours, 
  getShortTour, 
  createShortTour, 
  updateShortTour, 
  deleteShortTour 
} from '../controllers/shortTours';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getShortTours);
router.get('/:id', getShortTour);
router.post('/', authenticate, authorize('admin', 'editor'), createShortTour);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateShortTour);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteShortTour);

export default router;

