import Package from "../../models/package.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Determine the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to update a specific package by its ID
const updatePackage = async (req, res) => {
    try {
        const { packageId } = req.params;
        const { name, amount, items, description } = req.body;
        const userId = req.user.id; // ID of the logged-in user

        // Fetch the package from the database
        const packageItem = await Package.findOne({ where: { package_id: packageId } });

        // Check if the package exists
        if (!packageItem) {
            return res.status(404).json({ message: 'Package not found' });
        }

        // Check if the logged-in user is the owner of the package
        if (packageItem.vendor_id !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this package' });
        }

        // Prepare updated data
        const updatedData = { name, amount, description };

        // Parse items if provided and it's a valid JSON
        if (items) {
            try {
                updatedData.items = JSON.parse(items);
            } catch (error) {
                return res.status(400).json({ message: 'Items must be a valid JSON object' });
            }
        }

        // Handle file update if a new image is provided
        if (req.file) {
            // Delete the old image file if it exists
            const oldImagePath = path.join(__dirname, `../../uploads/images/${packageItem.img}`);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            // Update image path
            updatedData.img = `packages/${req.file.filename}`;
        }

        // Update the package
        const [affectedRows, updatedPackages] = await Package.update(updatedData, {
            where: { package_id: packageId },
            returning: true, // This will return the updated package
        });

        // Check if the update was successful
        if (affectedRows === 0) {
            return res.status(400).json({ message: 'Package update failed0' });
        }

        res.status(200).json({
            message: 'Package updated successfully',
            package: updatedPackages[0], // Get the updated package from the response
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating package',
            error: error.message,
        });
    }
};

export default updatePackage;