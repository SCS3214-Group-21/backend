import Payment from "../../models/payment.js";
import Vendor from "../../models/vendor.js";

const getProfileById = async (req, res) => {
    try {
        const vendorId = req.user.id;
        // console.log(`aa - ${vendorId}`);

        const vendorDetails = await Vendor.findOne({ where: { id: vendorId } });
        const paymentDetails = await Payment.findOne({ where: { user_id: vendorId}})

        if (!vendorDetails && !paymentDetails) {
            // return res.status(404).json({ message: 'Vendors not found' });
            await Vendor.create({ id: vendorId, role: req.user.role })
            await Payment.create({ user_id: vendorId })
            return res.status(200).json({ message: 'Vendor Created' });
        }

        res.status(200).json({
            message: 'Vendor profile retrieved successfully',
            vendorDetails,
            paymentDetails
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving vendor profile',
            error: error.message,
        });
    }
};

export default getProfileById;
