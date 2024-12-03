// // routes/conversationRoutes.js
// import express from 'express';
// import { startConversation } from '../controllers/chat/conversationController.js';

// const router = express.Router();

// router.post('/start-conversation', startConversation);

// export default router;

// routes/conversationRoutes.js
import express from 'express';
import { startConversation } from '../controllers/chat/conversationController.js';

const router = express.Router();

// Pass `io` directly to the controller
const conversationRoutes = (io) => {
    router.post('/start-conversation', (req, res) => startConversation(req, res, io)); // Pass io to the controller
    return router;
};

export default conversationRoutes;



