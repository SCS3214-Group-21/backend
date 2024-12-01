import WeddingPlan from "../../models/weddingplan.js";

const getEnableBudget = async (req, res) => {
    try {
        const clientId = req.user.id; // Get the authenticated user's ID from the request

        // Find the enabled budget for the user
        const enabledBudget = await WeddingPlan.findOne({
            where: {
                client_id: clientId,
                status: 1 // Check for the enabled budget (status is true)
            }
        });

        if (!enabledBudget) {
            return res.status(404).json({ message: "No enabled budget found for the user." });
        }

        res.status(200).json({
            message: "Enabled budget retrieved successfully.",
            budget: enabledBudget,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve enabled budget.",
            error: error.message,
        });
    }
};

export default getEnableBudget;
