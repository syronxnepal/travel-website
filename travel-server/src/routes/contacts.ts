import express from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Contacts route' });
});

export default router;

