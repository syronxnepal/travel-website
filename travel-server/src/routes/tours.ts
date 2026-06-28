import express from 'express';
import { 
  getTours, 
  getTour, 
  createTour, 
  updateTour, 
  deleteTour 
} from '../controllers/tours';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getTours);
router.get('/:id', getTour);
router.post('/', authenticate, authorize('admin', 'editor'), createTour);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateTour);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteTour);

export default router;

