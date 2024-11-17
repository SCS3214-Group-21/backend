// // controllers/chatController.js
// import Conversation from '../models/conversation.js';
// import Message from '../models/message.js';

// export const createConversation = async (req, res) => {
//     const { participants } = req.body;
//     const conversation = await Conversation.create({ participants });
//     res.status(201).json(conversation);
// };

// export const getMessages = async (req, res) => {
//     const { conversationId } = req.params;
//     const messages = await Message.find({ conversationId });
//     res.status(200).json(messages);
// };

// export const addMessage = async (req, res) => {
//     const { conversationId, sender, content } = req.body;
//     const message = await new Message({ conversationId, sender, content }).save();
//     res.status(201).json(message);
// };


// controllers/chatController.js
import { Op } from "sequelize";
import User from "../../models/user.js";

export const getVendors = async (req, res) => {
    try {
        // Fetch users where the role is neither "client" nor "admin"
        const vendors = await User.findAll({
            where: {
                [Op.and]: [
                    { role: { [Op.ne]: 'client' } },
                    { role: { [Op.ne]: 'admin' } }
                ]
            }
        });

        console.log("Fetched vendors:", vendors); // Log the result for debugging

        res.json(vendors);
    } catch (error) {
        console.error('Failed to fetch vendors:', error);
        res.status(500).json({ error: 'Failed to fetch vendors' });
    }
};


