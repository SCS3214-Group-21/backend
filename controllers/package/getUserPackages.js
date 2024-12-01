import Package from "../../models/package.js";

// Function to get all packages for the logged-in user
export const getUserPackages = async (req, res) => {
    try {
        // Extract user ID from the request object
        const userId = req.user.id;

        // Fetch all packages associated with the logged-in user
        const userPackages = await Package.findAll({ where: { vendor_id: userId } });

        // If no packages are found, return a 404 status and a specific message
        if (userPackages.length === 0) {
            return res.status(200).json({
                message: 'No packages found for this user',
                packages: []  // Return an empty array
            });
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
