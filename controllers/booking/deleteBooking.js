import Booking from "../../models/booking.js";
import Notification from "../../models/Notification.js"

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

        // creating a notification: @client
        await Notification.create({
            title: `Booking Has been Deleted for ${booking.vendor_type}`,
            description: ``,
            priority: 'high',
            viewed: false,
            user_id: booking.client_id,
        })

        // creating a notification: @vendor
        await Notification.create({
            title: `Booking Has been Deleted for your ${booking.package_name}`,
            description: ``,
            priority: 'high',
            viewed: false,
            user_id: booking.vendor_id,
        })

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
