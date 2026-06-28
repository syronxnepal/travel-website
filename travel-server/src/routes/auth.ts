import express from 'express';
import { login, register, getMe } from '../controllers/auth';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', authenticate, getMe);

export default router;

