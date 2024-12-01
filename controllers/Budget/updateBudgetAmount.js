import Client from "../../models/client.js";

// Controller to get the budget of a specific client by client_id
const updateBudgetAmount = async (req, res) => {
    const id = req.user.id; // Get client_id from the request params
    const { budget } = req.body; // Get the new budget from the request body

    if (typeof budget !== 'number' || budget < 0) {
        return res.status(400).json({ message: 'Invalid budget value. It should be a non-negative number.' });
    }

    try {
        // Find the client by client_id
        const client = await Client.findOne({
            where: { id },
        });

        // If the client is not found, return a 404 error
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Update the client's budget
        client.budget = budget;

        // Save the updated client data
        await client.save();

        // Return the updated budget
        return res.status(200).json({ message: 'Budget updated successfully', budget: client.budget });
    } catch (error) {
        console.error('Error updating client budget:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export default updateBudgetAmount;