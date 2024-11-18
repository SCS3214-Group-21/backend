import express from 'express';
import { getMessagesByConversationId, sendMessage } from '../controllers/chat/messageController.js';

const router = express.Router();

router.get('/:conversationId', getMessagesByConversationId); // Fetch messages
router.post('/send-message', sendMessage); // Send a message

export default router;


