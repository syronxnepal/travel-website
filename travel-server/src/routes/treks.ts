import express from 'express';
import { 
  getTreks, 
  getTrek, 
  createTrek, 
  updateTrek, 
  deleteTrek 
} from '../controllers/treks';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getTreks);
router.get('/:id', getTrek);
router.post('/', authenticate, authorize('admin', 'editor'), createTrek);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateTrek);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteTrek);

export default router;

