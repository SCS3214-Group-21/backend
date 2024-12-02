import Event from "../../models/Event.js"

const createEvent = async (req, res) => {
    try {
        const {title, description, event_date, start_time, end_time} = req.body

        if (!title || !event_date || ! start_time || !end_time) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const newEvent = await Event.create({
            title: title,
            description: description,
            user_id: req.user.id,
            event_date: event_date,
            start_time: start_time,
            end_time: end_time,
        })

        res.status(201).json({
            message: 'Event created successfully',
            event: newEvent,
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Error creating event',
            error: error.message,
        })
    }
}

export default createEvent