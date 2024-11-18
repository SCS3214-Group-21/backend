import Conversation from '../../models/Conversation.js';
import crypto from 'crypto'; // For generating random conversation IDs
import mongoose from 'mongoose'; // Ensure ObjectId handling

export const startConversation = async (req, res) => {
    const { clientId, vendorId } = req.body;
    console.log('Received Client ID:', clientId);
    console.log('Received Vendor ID:', vendorId);

    try {
        // Validate input: Ensure they are numbers
        if (!Number.isInteger(clientId) || !Number.isInteger(vendorId)) {
            return res.status(400).json({ error: 'Invalid clientId or vendorId. They must be integers.' });
        }

        // Check for an existing conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [clientId, vendorId] },
        });

        // If no conversation exists, create a new one
        if (!conversation) {
            const conversationId = crypto.randomUUID(); // Generate a unique conversation ID
            conversation = new Conversation({
                conversationId,
                participants: [clientId, vendorId],
            });
            await conversation.save();
        }

        // Return the conversation details
        res.status(200).json(conversation);
    } catch (error) {
        console.error('Error in startConversation:', error);
        res.status(500).json({ error: 'Failed to start conversation', details: error.message });
    }
};


