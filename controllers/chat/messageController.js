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
