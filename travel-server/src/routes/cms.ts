import express from 'express';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/dashboard', authenticate, (req, res) => {
  res.json({ success: true, message: 'CMS Dashboard route' });
});

export default router;

