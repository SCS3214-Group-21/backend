// routes/messageRoutes.js
// import express from 'express';
// import { sendMessage, getMessages } from '../controllers/chat/messageController.js';

// const router = express.Router();

// router.post('/send-message', sendMessage);
// router.get('/:conversationId', getMessages);

// export default router;

// import express from 'express';
// import { sendMessage, getMessages } from '../controllers/chat/messageController.js';

// const router = express.Router();

// router.post('/send-message', sendMessage);
// router.get('/:conversationId', getMessages);

// export default router;

import express from 'express';
import { getMessagesByConversationId, sendMessage } from '../controllers/chat/messageController.js';

const router = express.Router();

router.get('/:conversationId', getMessagesByConversationId); // Fetch messages
router.post('/send-message', sendMessage); // Send a message

export default router;


