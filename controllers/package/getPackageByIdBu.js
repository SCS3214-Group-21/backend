import Package from "../../models/package.js";

// Function to get a specific package by its ID
const getPackageById = async (req, res) => {
    try {
        // Extract package ID from the request parameters
        const { packageId } = req.params;
        // console.log(`aa - ${packageId}`);

        // Fetch the package from the database
        const packageItem = await Package.findOne({ where: { package_id: packageId } });

        // Check if the package exists
        if (!packageItem) {
            return res.status(404).json({ message: 'Package not found' });
        }

        // Respond with the package details
        res.status(200).json({
            message: 'Package retrieved successfully',
            packageItem
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving package',
            error: error.message,
        });
    }
};

export default getPackageById;
