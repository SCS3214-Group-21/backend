import Event from "../../models/Event.js"

const updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params
        const {title, description, event_date, start_time, end_time} = req.body
        const userId = req.user.id

        const event = await Event.findOne({ where: {event_id: eventId }})
        if (!event) {
            return res.status(400).json({ message: 'Event not found' })
        }

        if (event.user_id !== userId) {
            return res.status(403).json({ message: 'Unauthorized' })
        }

        const updatedEvent = { title, description, event_date, start_time, end_time }

        const [affectedRows, updatedEvents] = await Event.update(updatedEvent, {
            where: { event_id: eventId },
            returning: true,
        })

        if (affectedRows === 0) {
            return res.status(400).json({ message: 'Event update failed' })
        }

        res.status(200).json({
            message: 'Event updated successfully',
            event: updatedEvents[0],
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Error updating event',
            error: error.message,
        })
    }
}

export default updateEvent