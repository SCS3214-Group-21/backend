import Package from "../../models/package.js";

// Function to get all packages for the logged-in user
export const getUserPackages = async (req, res) => {
    try {
        // Extract user ID from the request object
        const userId = req.user.id;

        // Fetch all packages associated with the logged-in user
        const userPackages = await Package.findAll({ where: { vendor_id: userId } });

        // Check if there are any packages for the user
        if (!userPackages.length) {
            return res.status(404).json({ message: 'No packages found for this user' });
        }

        // Respond with the list of packages
        res.status(200).json({
            message: 'Packages retrieved successfully',
            packages: userPackages
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving packages',
            error: error.message,
        });
    }
};

export default getUserPackages;