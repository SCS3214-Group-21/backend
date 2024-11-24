import WeddingPlan from "../../models/weddingplan.js";

const getBudget = async (req, res) => {
    try {
        const { id } =req.params;
        const budgetDetails = await WeddingPlan.findOne({ where: { plan_id: id } });

        if(!budgetDetails) {
            return res.status(404).json({ message: 'Budget Not Found'});
        }

        res.status(200).json({
            message: 'Budget retrieved successfully',
            budgetDetails
        });
    } catch(error) {
        res.status(500).json({
            message: 'Error retrieving budget',
            error: error.message,
        });
    }
};

export default getBudget;