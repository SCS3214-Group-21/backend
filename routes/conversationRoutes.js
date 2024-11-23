// routes/conversationRoutes.js
import express from 'express';
import { startConversation } from '../controllers/chat/conversationController.js';

const router = express.Router();

router.post('/start-conversation', startConversation);

export default router;

