import Booking from "../../models/booking";

// Function to delete a booking
const deleteBooking = async (req, res) => {
    try {
        const { booking_id } = req.params;

        // Find the booking by ID
        const booking = await Booking.findByPk(booking_id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Delete the booking
        await booking.destroy();

        res.status(200).json({
            message: 'Booking deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting booking',
            error: error.message,
        });
    }
};

export default deleteBooking;
