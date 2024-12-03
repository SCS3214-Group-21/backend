import Client from "../../models/client.js";

// Controller to get the budget of a specific client by client_id
const getBudgetAmount = async (req, res) => {
    const id = req.user.id;

    try {
        // Fetch client details from the database using the client_id
        const client = await Client.findOne({
            where: { id }, // Search for the client by client_id
        });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' }); // If client not found
        }

        // Return the budget from the found client
        return res.status(200).json({ budget: client.budget, guest: client.guest_count });
    } catch (error) {
        console.error('Error fetching client budget:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export default getBudgetAmount;