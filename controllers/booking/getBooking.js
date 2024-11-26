import Booking from "../../models/booking";

// Function to get all bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();

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
