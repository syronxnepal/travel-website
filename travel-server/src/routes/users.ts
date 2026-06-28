import express from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, authorize('admin'), (req, res) => {
  res.json({ success: true, message: 'Users route' });
});

export default router;

