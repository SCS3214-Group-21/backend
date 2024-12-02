// import Message from '../../models/Message.js';

// export const getMessagesByConversationId = async (req, res) => {
//     const { conversationId } = req.params;

//     try {
//         const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
//         res.status(200).json(messages);
//     } catch (error) {
//         console.error('Error fetching messages:', error);
//         res.status(500).json({ error: 'Failed to fetch messages', details: error.message });
//     }
// };

// export const sendMessage = async (req, res) => {
//     const { conversationId, senderId, receiverId, text } = req.body;

//     try {
//         const newMessage = new Message({
//             conversationId,
//             senderId,
//             receiverId,
//             text,
//         });

//         const savedMessage = await newMessage.save();
//         res.status(201).json(savedMessage);
//     } catch (error) {
//         console.error('Error sending message:', error);
//         res.status(500).json({ error: 'Failed to send message', details: error.message });
//     }
// };

// import Message from '../../models/Message.js';

// export const getMessagesByConversationId = async (req, res) => {
//     const { conversationId } = req.params;

//     try {
//         // Fetch all messages for the conversation, sorted by creation date (ascending)
//         const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
//         res.status(200).json(messages); // Send back all messages in the conversation
//     } catch (error) {
//         console.error('Error fetching messages:', error);
//         res.status(500).json({ error: 'Failed to fetch messages', details: error.message });
//     }
// };

// export const sendMessage = async (req, res) => {
//     const { conversationId, senderId, receiverId, text } = req.body;

//     try {
//         // Create a new message
//         const newMessage = new Message({
//             conversationId,
//             senderId,
//             receiverId,
//             text,
//         });

//         // Save the message to the database
//         const savedMessage = await newMessage.save();

//         // Emit the new message to both sender and receiver in real-time
//         req.io.to(conversationId).emit('newMessage', savedMessage); // Emit to all participants of the conversation

//         // Optionally, emit a message to the sender (if you want a more specific notification)
//         req.io.to(senderId).emit('messageSent', savedMessage);
//         req.io.to(receiverId).emit('messageReceived', savedMessage);

//         res.status(201).json(savedMessage); // Respond with the saved message
//     } catch (error) {
//         console.error('Error sending message:', error);
//         res.status(500).json({ error: 'Failed to send message', details: error.message });
//     }
// };

import Message from '../../models/Message.js';

export const getMessagesByConversationId = async (req, res) => {
        const { conversationId } = req.params;
    
        try {
            // Fetch all messages for the conversation, sorted by creation date (ascending)
            const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
            res.status(200).json(messages); // Send back all messages in the conversation
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({ error: 'Failed to fetch messages', details: error.message });
        }
    };

// controllers/chat/messageController.js
export const sendMessage = async (req, res, io) => {
    const { conversationId, senderId, receiverId, text } = req.body;

    try {
        // Create a new message
        const newMessage = new Message({
            conversationId,
            senderId,
            receiverId,
            text,
        });

        // Save the message to the database
        const savedMessage = await newMessage.save();

        // Emit the new message to both sender and receiver in real-time
        io.to(conversationId).emit('newMessage', savedMessage); // Emit to all participants of the conversation

        // Optionally, emit a message to the sender (if you want a more specific notification)
        io.to(senderId).emit('messageSent', savedMessage);
        io.to(receiverId).emit('messageReceived', savedMessage);

        res.status(201).json(savedMessage); // Respond with the saved message
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message', details: error.message });
    }
};
