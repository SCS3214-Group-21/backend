import Event from "../../models/Event.js";

const getEventById = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findOne({ where: {event_id: eventId} })

        if (!event) {
            return res.status(404).json({ message: 'Event not found' })
        }

        res.status(200).json({
            message: 'Event retrieved successfully',
            event
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving event',
            error: error.message,
        })
    }
}

export default getEventById