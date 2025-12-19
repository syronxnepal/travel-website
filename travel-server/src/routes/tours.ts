import express from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Placeholder routes - similar structure to treks
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Tours route' });
});

export default router;

