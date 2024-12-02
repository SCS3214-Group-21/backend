import Event from "../../models/Event.js"

const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params
        const userId = req.user.id

        const event = await Event.findOne({ where: {event_id: eventId }})
        if (!event) {
            return res.status(400).json({ message: 'Event not found' })
        }

        if ( event.user_id !== userId ) {
            return res.status(403).json({ message: 'Unauthorized' })
        }

        await Event.destroy({ where: { event_id: eventId } })

        res.status(200).json({
            message: 'Event deleted successfully'
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Error deleting event',
            error: error.message
        })
    }
}

export default deleteEvent