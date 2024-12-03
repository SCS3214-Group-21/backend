import Booking from "../../models/booking.js";

// Function to create a new booking
const createBooking = async (req, res) => {
    try {
        const { vendor_id, client_id, vendor_type, price, package_id, package_name, booking_date, booking_time, guest_count, status } = req.body;

        // Ensure required fields are provided
        // if (!vendor_id || !client_id || !vendor_type || !price || !package_id || !package_name || !booking_date || !booking_time || !guest_count || !status) {
        //     return res.status(400).json({ message: 'All fields are required' });
        // }
        console.log(vendor_id);
        console.log(client_id);
        console.log(vendor_type);
        console.log(price);
        console.log(package_id);
        console.log(package_name);
        console.log(booking_date);
        console.log(booking_time);
        console.log(guest_count);
        console.log(status);

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

        // creating a notification: @client
        await Notification.create({
            title: `Booking Has been Placed for ${vendor_type}`,
            description: `Description: On ${booking_date} at ${booking_time}`,
            priority: 'high',
            viewed: false,
            user_id: client_id,
        })

        // creating a notification: @vendor
        await Notification.create({
            title: `Booking Has been Placed for your ${package_name}`,
            description: `Description: On ${booking_date} at ${booking_time}`,
            priority: 'high',
            viewed: false,
            user_id: vendor_id,
        })

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
