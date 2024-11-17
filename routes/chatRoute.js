// // routes/chatRoute.js
// import express from 'express';
// import { createConversation, getMessages, addMessage } from '../controllers/chatController.js';

// const router = express.Router();

// router.post('/conversation', createConversation);  // Start a new conversation
// router.get('/messages/:conversationId', getMessages);  // Retrieve all messages in a conversation
// router.post('/message', addMessage);  // Send a new message

// export default router;


// routes/chatRoutes.js
import express from 'express';
import { getVendors } from '../controllers/chat/chatController.js';

const router = express.Router();

router.get('/vendors', getVendors);

export default router;


