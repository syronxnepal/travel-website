import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { 
  getBookings, 
  getBooking, 
  createBooking, 
  updateBooking, 
  deleteBooking 
} from '../controllers/bookings';

const router = express.Router();

// Public route for creating bookings
router.post('/', createBooking);

// Protected routes for managing bookings
router.get('/', authenticate, authorize('admin', 'editor'), getBookings);
router.get('/:id', authenticate, authorize('admin', 'editor'), getBooking);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateBooking);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteBooking);

export default router;

