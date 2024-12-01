import Booking from "../../models/booking.js";
import Client from "../../models/client.js";

const getBookingByVendor = async (req, res) => {
    try {
        // Get the vendor ID from the authenticated user's token
        const vendorId = req.user.id;
        console.log(vendorId)

        // Fetch bookings for the specific vendor where status is "Pending"
        const bookings = await Booking.findAll({
            where: {
                vendor_id: vendorId, // Match bookings with the vendor's ID
                status: 'Pending',  // Only fetch bookings with "Pending" status
            },
            include: [
                {
                    model: Client,
                    as: 'client', // Alias for the Client association
                    attributes: ['groom_name', 'location'], // Include groom_name and location from Client table
                },
            ],
        });

        if (bookings.length === 0) {
            return res.status(200).json({
                message: 'No pending bookings found for this vendor.',
                bookings: [],
            });
        }

        res.status(200).json({
            message: 'Pending bookings retrieved successfully.',
            bookings,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching bookings',
            error: error.message,
        });
    }
};

export default getBookingByVendor;
