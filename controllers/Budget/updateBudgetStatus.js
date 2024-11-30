import WeddingPlan from "../../models/weddingplan.js";

const updateBudgetStatus = async (req, res) => {
    try {
        const { id } = req.params; // Budget ID from request params
        const clientId = req.user.id; // Client ID from authenticated user
    
        // Find the budget with the provided plan_id
        const budget = await WeddingPlan.findOne({ where: { plan_id: id } });

        // Check if the budget exists
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        // Check if the logged-in user is the owner of the budget
        if (budget.client_id !== clientId) {
            return res.status(403).json({ message: 'You are not authorized to update this budget' });
        }

        // Retrieve all budgets for the client to update their status
        const allBudgets = await WeddingPlan.findAll({ where: { client_id: clientId } });

        // Disable all other budgets (set their status to false)
        const updatePromises = allBudgets.map(async (otherBudget) => {
            if (otherBudget.plan_id !== id) { // Skip the current budget being updated
                return otherBudget.update({ status: false }); // Disable other budgets
            }
        });

        // Wait for all budget status updates to finish
        await Promise.all(updatePromises);

        // Now update the selected budget (toggle its status)
        const updatedIsEnable = !budget.status; // Toggle the current status
        const affectedRows = await budget.update(
            { status: updatedIsEnable },
            { where: { plan_id: id } }
        );

        // Check if the update was successful
        if (affectedRows === 0) {
            return res.status(400).json({ message: 'Budget enable status toggle failed' });
        }

        // Retrieve the updated budget
        const updatedBudget = await WeddingPlan.findOne({ where: { plan_id: id } });

        res.status(200).json({
            message: 'Budget enable status toggled successfully',
            budget: updatedBudget, // Send the updated budget as a response
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update budget status.",
            error: error.message,
        });
    }
};

export default updateBudgetStatus;
