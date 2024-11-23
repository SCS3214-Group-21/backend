import express from 'express';
import { getVendors, getClients } from '../controllers/chat/chatController.js';
import { isAuthorize, isVendor } from '../middlewares/auth.js'

const router = express.Router();

router.get('/vendors', getVendors);
// router.get('/clients', getClients);
router.get('/clients', isAuthorize, isVendor, getClients);

export default router;


