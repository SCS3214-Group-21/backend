import Booking from "../../models/booking.js";

const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Update the booking status
        const booking = await Booking.findByPk(id); 
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        booking.status = status;
        await booking.save();

        res.status(200).json({
            message: 'Booking status updated successfully.',
            booking,
        });
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({ message: 'Failed to update booking status.' });
    }
};

export default updateBookingStatus;
