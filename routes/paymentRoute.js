import express from 'express';
import { createCheckoutSession } from '../controllers/payment/doPayment.js';

const router = express.Router();

// Create checkout session route
router.post('/create-checkout-session', createCheckoutSession);

export default router;

