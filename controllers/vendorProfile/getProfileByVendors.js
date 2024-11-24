import Vendor from "../../models/vendor.js";
import User from "../../models/user.js";

const getProfileByVendors = async (req, res) => {
    try {
        const { vendor: role } = req.params; // Extract the vendor role (e.g., "client") from the URL

        // Find all users with the specified role and include their associated vendor details
        const vendorDetails = await User.findAll({
            where: { role },
            include: [
                {
                    model: Vendor,
                    attributes: { exclude: ['id'] }, // Exclude the duplicate `id` field
                },
            ],
            attributes: ['id', 'email', 'role'], // Specify User attributes to fetch
        });

        // If no vendors are found, return 404
        if (!vendorDetails.length) {
            return res.status(404).json({ message: 'No vendors found for the specified role.' });
        }

        // Return the found vendor details
        res.status(200).json({
            message: 'Vendors retrieved successfully.',
            vendorDetails,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving vendors.',
            error: error.message,
        });
    }
};

export default getProfileByVendors;
