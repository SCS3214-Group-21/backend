import Booking from "../../models/booking.js";
import Notification from "../../models/Notification.js"

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

        // creating a notification: @client
        await Notification.create({
            title: `Booking details has been Changed for ${booking.vendor_type}`,
            description: ``,
            priority: 'high',
            viewed: false,
            user_id: booking.client_id,
        })

        // creating a notification: @vendor
        await Notification.create({
            title: `Booking details Has been Changed for your ${booking.package_name}`,
            description: ``,
            priority: 'high',
            viewed: false,
            user_id: booking.vendor_id,
        })

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
