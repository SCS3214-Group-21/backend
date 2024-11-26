import Booking from "../../models/booking";

// Function to update a booking
const updateBooking = async (req, res) => {
    try {
        const { booking_id } = req.params;
        const { vendor_id, client_id, vendor_type, price, package_id, package_name, booking_date, booking_time, guest_count, status } = req.body;

        // Find the booking by ID
        const booking = await Booking.findByPk(booking_id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Update the booking
        const updatedBooking = await booking.update({
            vendor_id,
            client_id,
            vendor_type,
            price,
            package_id,
            package_name,
            booking_date,
            booking_time,
            guest_count,
            status,
        });

        res.status(200).json({
            message: 'Booking updated successfully',
            booking: updatedBooking,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating booking',
            error: error.message,
        });
    }
};

export default updateBooking;
