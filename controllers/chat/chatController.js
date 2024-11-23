import { Op } from "sequelize";
import User from "../../models/user.js";
import Conversation from "../../models/Conversation.js";

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


export const getClients = async (req, res) => {
    try {
        // Ensure `req.user` is populated by middleware
        const vendorId = req.user.id;
        console.log('Vendor ID:', vendorId);

        // Fetch all conversations where the vendor is a participant
        const conversations = await Conversation.find({
            participants: vendorId, // Check if the vendor ID exists in participants
        });

        if (!conversations || conversations.length === 0) {
            console.log('No conversations found for the vendor.');
            return res.json([]); // No conversations found, return an empty array
        }

        // Extract unique client IDs (exclude the vendor's ID)
        const clientIds = [
            ...new Set(
                conversations.flatMap((conversation) =>
                    conversation.participants.filter((participant) => participant !== vendorId)
                )
            ),
        ];

        if (clientIds.length === 0) {
            return res.json([]); // No valid client IDs found
        }

        // Fetch client details from the User table (only clients who have a conversation with this vendor)
        const clients = await User.findAll({
            where: {
                id: { [Op.in]: clientIds }, // Match only extracted client IDs
                role: 'client', // Ensure only clients are fetched
            },
            attributes: ['id', 'email'], // Fetch only necessary fields
        });

        console.log('Fetched clients for vendor:', clients);
        res.json(clients); // Return the list of clients
    } catch (error) {
        console.error('Failed to fetch clients for vendor:', error);
        res.status(500).json({
            error: 'Failed to fetch clients for vendor',
            details: error.message,
        });
    }
};