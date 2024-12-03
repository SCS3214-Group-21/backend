import { createSubscription } from '../controllers/subscription/createSubscription.js';
import express from 'express';
import { isAuthorize } from '../middlewares/auth.js';
import { getSubscriptionStatus } from '../controllers/subscription/getSubscriptionStatus.js';

const router = express.Router();

router.post('/create-subscription', isAuthorize, createSubscription);
router.get('/status', isAuthorize, getSubscriptionStatus);

export default router;