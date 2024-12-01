import WeddingPlan from "../../models/weddingplan.js";
import Progress from "../../models/progress.js";

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
            if (otherBudget.plan_id !== id) {
                return otherBudget.update({ status: false }); // Disable other budgets
            }
        });

        // Wait for all budget status updates to finish
        await Promise.all(updatePromises);

        // Now update the selected budget (toggle its status)
        const updatedIsEnable = !budget.status; // Toggle the current status
        await budget.update({ status: updatedIsEnable });

        // Check if a progress entry already exists for the plan
        let progressEntry = await Progress.findOne({ where: { plan_id: id, client_id: clientId } });

        if (!progressEntry) {
            // Create a new progress entry
            const progressData = {
                plan_id: id,
                client_id: clientId,
                hotels: budget.hotels > 0 ? 0 : -1,
                dressers: budget.dressers > 0 ? 0 : -1,
                photography: budget.photography > 0 ? 0 : -1,
                floral: budget.floral > 0 ? 0 : -1,
                jewellary: budget.jewellary > 0 ? 0 : -1,
                dancing_groups: budget.dancing_groups > 0 ? 0 : -1,
                ashtaka: budget.ashtaka > 0 ? 0 : -1,
                salons: budget.salons > 0 ? 0 : -1,
                dJs: budget.dJs > 0 ? 0 : -1,
                honeymoon: budget.honeymoon > 0 ? 0 : -1,
                cars: budget.cars > 0 ? 0 : -1,
                invitation_cards: budget.invitation_cards > 0 ? 0 : -1,
                poruwa: budget.poruwa > 0 ? 0 : -1,
                catering: budget.catering > 0 ? 0 : -1,
                progress: 0 // Initialize progress (can be calculated later)
            };

            progressEntry = await Progress.create(progressData);
        }

        res.status(200).json({
            message: 'Budget enable status toggled successfully',
            budget: budget, // Send the updated budget as a response
            progress: progressEntry, // Send the created or existing progress entry
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update budget status.",
            error: error.message,
        });
    }
};

export default updateBudgetStatus;
