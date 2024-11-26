import Vendor from "../../models/vendor.js";
import User from "../../models/user.js";
import Package from "../../models/package.js";

const getVendorDetailsById = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch vendor details based on the provided user ID
        const vendorDetails = await User.findOne({
            where: { id },
            include: [
                {
                    model: Vendor,
                    attributes: { exclude: ['id'] },
                },
                {
                    model: Package,
                    required: false,
                    attributes: ['package_id', 'name', 'img', 'amount', 'items', 'description'],
                },
            ],
            attributes: ['id', 'email', 'role'],
        });

        if (!vendorDetails) {
            return res.status(404).json({ message: 'Vendor not found.' });
        }

        res.status(200).json({
            message: 'Vendor details retrieved successfully.',
            vendorDetails,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving vendor details.',
            error: error.message,
        });
    }
};

export default getVendorDetailsById;

