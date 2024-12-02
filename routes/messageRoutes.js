// import express from 'express';
// import { getMessagesByConversationId, sendMessage } from '../controllers/chat/messageController.js';

// const router = express.Router();

// router.get('/:conversationId', getMessagesByConversationId); // Fetch messages
// router.post('/send-message', sendMessage); // Send a message

// export default router;

// routes/messageRoutes.js
import express from 'express';
import { getMessagesByConversationId, sendMessage } from '../controllers/chat/messageController.js';

const router = express.Router();

const messageRoutes = (io) => {
    router.get('/:conversationId', getMessagesByConversationId); // Fetch messages
    router.post('/send-message', (req, res) => sendMessage(req, res, io)); // Pass io to sendMessage
    return router;
};

export default messageRoutes;



