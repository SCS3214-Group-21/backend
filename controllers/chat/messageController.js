// // controllers/messageController.js
// import Message from '../../models/Message.js';
// import Conversation from '../../models/Conversation.js';

// export const sendMessage = async (req, res) => {
//     const { conversationId, senderId, receiverId, text } = req.body;
//     try {
//         // Ensure `content` is assigned the value of `text`
//         const message = new Message({ conversationId, sender: senderId, receiver: receiverId, content: text });
//         await message.save();

//         // Update the conversation's last message
//         await Conversation.findByIdAndUpdate(conversationId, { lastMessage: text, updatedAt: new Date() });

//         res.json(message);
//     } catch (error) {
//         console.error('Failed to send message:', error); // Log the error for debugging
//         res.status(500).json({ error: 'Failed to send message' });
//     }
// };



// export const getMessages = async (req, res) => {
//     const { conversationId } = req.params;
//     try {
//         const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
//         res.json(messages);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch messages' });
//     }
// };


// controllers/messageController.js
// import Message from '../../models/Message.js';
// import Conversation from '../../models/Conversation.js';

// export const sendMessage = async (req, res) => {
//     const { conversationId, senderId, receiverId, text } = req.body;

//     try {
//         const message = new Message({
//             conversationId,
//             senderId,
//             receiverId,
//             text,
//         });

//         const savedMessage = await message.save();
//         res.status(201).json(savedMessage);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to send message' });
//     }
// };

// export const getMessages = async (req, res) => {
//     const { conversationId } = req.params;

//     try {
//         const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
//         res.status(200).json(messages);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to fetch messages' });
//     }
// };


import Message from '../../models/Message.js';

export const getMessagesByConversationId = async (req, res) => {
    const { conversationId } = req.params;

    try {
        const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages', details: error.message });
    }
};

export const sendMessage = async (req, res) => {
    const { conversationId, senderId, receiverId, text } = req.body;

    try {
        const newMessage = new Message({
            conversationId,
            senderId,
            receiverId,
            text,
        });

        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message', details: error.message });
    }
};
