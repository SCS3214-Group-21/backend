import WeddingPlan from "../../models/weddingplan.js";
import Package from "../../models/package.js";
import { Op } from "sequelize";

const getAllMinBudget = async (req, res) => {
    try {
        const { planId, category } = req.body;

        console.log('Received request payload:', { planId, category });

        if (!planId || !category) {
            return res.status(400).json({ message: 'planId and category are required.' });
        }

        const normalizedCategory = category.toLowerCase(); // Normalize category
        const weddingPlan = await WeddingPlan.findOne({ where: { plan_id: planId } });

        if (!weddingPlan) {
            return res.status(404).json({ message: 'Wedding plan not found.' });
        }

        console.log('Fetched wedding plan:', weddingPlan);

        const allocatedBudget = weddingPlan[normalizedCategory];
        if (allocatedBudget == null) {
            return res.status(400).json({ message: `Invalid or missing budget for category: ${category}` });
        }

        console.log('Allocated budget:', allocatedBudget);

        const packages = await Package.findAll({
            where: {
                role: category,
                amount: { [Op.lte]: allocatedBudget },
                is_enable: true,
            },
        });

        console.log('Fetched packages:', packages);
        return res.status(200).json(packages);
    } catch (error) {
        console.error('Error fetching packages:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

export default getAllMinBudget;
