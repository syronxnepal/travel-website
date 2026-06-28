import express from 'express';
import { createPaymentIntent, confirmPayment } from '../controllers/stripe';

const router = express.Router();

// Payment intent creation
router.post('/create-payment-intent', createPaymentIntent);

// Payment confirmation
router.post('/confirm-payment', confirmPayment);

export default router;

