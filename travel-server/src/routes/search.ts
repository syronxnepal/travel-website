import express from 'express';
import { search } from '../controllers/search';

const router = express.Router();

// Public search route
router.get('/', search);

export default router;

