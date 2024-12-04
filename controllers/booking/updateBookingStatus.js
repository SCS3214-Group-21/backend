import Booking from "../../models/booking.js";
import Notification from "../../models/Notification.js"
import Event from "../../models/Event.js";
import { addHours } from "date-fns"

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

        if (booking.status === 'Accepted') {
            // creating an event: @client
            await Event.create({
                title: `Meetup for: ${booking.vendor_type}`,
                description: `You have reserved a booking for: ${booking.package_name}`,
                user_id: req.user.id,
                event_date: booking.booking_date,
                start_time: booking.booking_time,
                end_time: addHours(new Date(`${booking.booking_date}T${booking.booking_time}`), 1).toTimeString().slice(0, 8),
            })

            // creating an event: @vendor
            await Event.create({
                title: `Meetup for: ${booking.package_name}`,
                description: `You have accepted a booking`,
                user_id: req.user.id,
                event_date: booking.booking_date,
                start_time: booking.booking_time,
                end_time: addHours(new Date(`${booking.booking_date}T${booking.booking_time}`), 1).toTimeString().slice(0, 8),
            })
        }

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
