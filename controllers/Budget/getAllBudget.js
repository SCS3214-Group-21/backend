import WeddingPlan from "../../models/weddingplan.js";

const getAllBudget = async (req, res) => {
    try {
        // Extract the user's ID from the request
        const userId = req.user.id;

        // Query the WeddingPlan model for all entries associated with the user's ID
        const budgets = await WeddingPlan.findAll({
            where: { client_id: userId }, // Filter by userId
        });

        // Respond with the retrieved budgets
        res.status(200).json({
            message: "Budgets retrieved successfully.",
            data: budgets,
        });
    } catch (error) {
        // Handle any errors that occur during retrieval
        res.status(500).json({
            message: "Error retrieving budgets.",
            error: error.message,
        });
    }
};

export default getAllBudget;
