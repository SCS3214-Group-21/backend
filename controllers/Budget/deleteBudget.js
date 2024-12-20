import WeddingPlan from '../../models/weddingplan.js';
import Progress from '../../models/progress.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to delete a specific budget by its ID
const deleteBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // ID of the logged-in user

        // Fetch the budget from the database
        const budget = await WeddingPlan.findOne({ where: { plan_id: id } });

        // Check if the budget exists
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        // Check if the logged-in user is the owner of the budget
        if (budget.client_id !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this budget' });
        }

        // Check if the status allows deletion (status should be 0 for deletion)
        if (budget.status === 1) {
            return res.status(403).json({ message: 'This budget cannot be deleted because it is active' });
        }

        // Check for associated progress records
        const associatedProgress = await Progress.findAll({ where: { plan_id: id } });

        // If associated progress exists, delete them
        if (associatedProgress.length > 0) {
            await Progress.destroy({ where: { plan_id: id } });
        }

        // Delete the old image file if it exists
        const imagePath = path.join(__dirname, `../../uploads/${budget.img}`);
        if (fs.existsSync(imagePath)) {
            try {
                fs.unlinkSync(imagePath);
            } catch (err) {
                console.error(`Failed to delete image file: ${imagePath}`, err);
            }
        }

        // Delete the budget from the database
        await WeddingPlan.destroy({ where: { plan_id: id } });

        res.status(200).json({
            message: 'Budget deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting budget',
            error: error.message,
        });
    }
};

export default deleteBudget;
