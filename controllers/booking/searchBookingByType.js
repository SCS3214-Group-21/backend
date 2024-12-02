import Booking from "../../models/booking.js";
import Vendor from "../../models/vendor.js";

const searchBookingByType = async (req, res) => {
    try {
        const { vendorType } = req.query;

        // Handle invalid vendorType
        if (!vendorType) {
            return res.status(400).json({
                message: 'Vendor type is required.',
            });
        }

        const whereCondition = vendorType === 'all' ? {} : { vendor_type: vendorType };

        // Fetch bookings with associated vendor information
        const bookings = await Booking.findAll({
            where: whereCondition,
            include: [
                {
                    model: Vendor,
                    as: 'vendor', // Ensure the alias is correct
                    attributes: ['pic', 'business_name'], // Only fetch required fields
                },
            ],
        });

        res.status(200).json({
            message: 'Bookings retrieved successfully.',
            bookings,
        });
    } catch (error) {
        console.error('Error fetching bookings:', error); // Log the error for debugging
        res.status(500).json({
            message: 'Error fetching bookings',
            error: error.message, // Provide more specific error details if needed
        });
    }
};

export default searchBookingByType;
