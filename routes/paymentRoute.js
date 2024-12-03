import express from 'express';
import { createCheckoutSession } from '../controllers/payment/doPayment.js';
import { isAuthorize } from '../middlewares/auth.js';

const router = express.Router();

// Create checkout session route
router.post('/create-checkout-session',isAuthorize, createCheckoutSession);

export default router;

