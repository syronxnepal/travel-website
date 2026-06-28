import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';

// Initialize Stripe with secret key from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
let stripe: Stripe | null = null;

if (stripeSecretKey) {
  stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2026-01-28.clover',
  });
} else {
  console.warn('Warning: STRIPE_SECRET_KEY is not set. Stripe payments will not work.');
}

// Create a payment intent (booking is stored only after payment succeeds)
export const createPaymentIntent = async (req: Request, res: Response): Promise<Response | void> => {
  if (!stripe) {
    return res.status(500).json({
      success: false,
      message: 'Stripe is not configured. Please set STRIPE_SECRET_KEY in environment variables.'
    });
  }

  try {
    const { amount, currency = 'usd', metadata } = req.body;

    if (amount === undefined || amount === null) {
      return res.status(400).json({
        success: false,
        message: 'Amount is required'
      });
    }

    // Convert amount to cents (Stripe uses smallest currency unit)
    const amountInCents = Math.round(parseFloat(amount) * 100);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency.toLowerCase(),
      metadata: metadata && typeof metadata === 'object' ? metadata : undefined,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }
    });
  } catch (error: any) {
    console.error('Stripe payment intent creation error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create payment intent'
    });
  }
};

// Confirm payment (returns Stripe status; booking creation endpoint will verify before saving)
export const confirmPayment = async (req: Request, res: Response): Promise<Response | void> => {
  if (!stripe) {
    return res.status(500).json({
      success: false,
      message: 'Stripe is not configured. Please set STRIPE_SECRET_KEY in environment variables.'
    });
  }

  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment intent ID is required'
      });
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return res.json({
      success: true,
      data: {
        paymentStatus: paymentIntent.status,
      }
    });
  } catch (error: any) {
    console.error('Payment confirmation error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to confirm payment'
    });
  }
};

// Webhook handler for Stripe events
export const handleWebhook = async (req: Request, res: Response, next?: NextFunction): Promise<Response | void> => {
  if (!stripe) {
    return res.status(500).json({
      success: false,
      message: 'Stripe is not configured. Please set STRIPE_SECRET_KEY in environment variables.'
    });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return res.status(500).json({
      success: false,
      message: 'Webhook secret not configured'
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig as string, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({
      success: false,
      message: `Webhook Error: ${err.message}`
    });
  }

  // Booking is stored only after payment succeeds via /api/bookings.
  // Webhooks can still be used for analytics / reconciliation if desired.

  return res.json({ received: true });
};

