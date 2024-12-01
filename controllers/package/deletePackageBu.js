import Package from "../../models/package.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Determine the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to delete a specific package by its ID
const deletePackage = async (req, res) => {
    try {
        const { packageId } = req.params;
        const userId = req.user.id; // ID of the logged-in user

        // Fetch the package from the database
        const packageItem = await Package.findOne({ where: { package_id: packageId } });

        // Check if the package exists
        if (!packageItem) {
            return res.status(404).json({ message: 'Package not found' });
        }

        // Check if the logged-in user is the owner of the package
        if (packageItem.vendor_id !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this package' });
        }

        // Delete the old image file if it exists
        const imagePath = path.join(__dirname, `../../uploads/images/${packageItem.img}`);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Delete the package from the database
        await Package.destroy({ where: { package_id: packageId } });

        res.status(200).json({
            message: 'Package deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting package',
            error: error.message,
        });
    }
};

export default deletePackage;
