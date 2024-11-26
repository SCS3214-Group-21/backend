import Booking from "../../models/booking";

// Function to create a new booking
const createBooking = async (req, res) => {
    try {
        const { vendor_id, client_id, vendor_type, price, package_id, package_name, booking_date, booking_time, guest_count, status } = req.body;

        // Ensure required fields are provided
        if (!vendor_id || !client_id || !vendor_type || !price || !package_id || !package_name || !booking_date || !booking_time || !guest_count || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create the new booking
        const newBooking = await Booking.create({
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

        res.status(201).json({
            message: 'Booking created successfully',
            booking: newBooking,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating booking',
            error: error.message,
        });
    }
};

export default createBooking;
