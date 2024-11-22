import Vendor from "../../models/vendor.js";

const getProfileById = async (req, res) => {
    try {
        const vendorId = req.user.id;
        // console.log(`aa - ${vendorId}`);

        const vendorDetails = await Vendor.findOne({ where: { id: vendorId } });

        if (!vendorDetails) {
            return res.status(404).json({ message: 'Vendors not found' });
        }

        res.status(200).json({
            message: 'Vendor profile retrieved successfully',
            vendorDetails
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving vendor profile',
            error: error.message,
        });
    }
};

export default getProfileById;
