import Booking from "../../models/booking.js";
import Vendor from "../../models/vendor.js";

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [
                {
                    model: Vendor,
                    as: 'vendor', // Match alias in association
                    attributes: ['pic', 'business_name'], // Fetch only required fields
                },
            ],
        });

        res.status(200).json({
            message: 'Bookings retrieved successfully',
            bookings,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching bookings',
            error: error.message,
        });
    }
};


export default getBookings;


