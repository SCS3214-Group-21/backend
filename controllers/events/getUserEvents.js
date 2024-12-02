import Event from "../../models/Event.js"
import message from "../../models/Message.js";

export const getUserEvents = async (req, res) => {
    try {
        const userId = req.user.id;

        const userEvents = await Event.findAll({ where: { user_id: userId } })

        if (userEvents.length === 0) {
            return res.status(200).json({
                message: 'No Events found for this user',
                package: []
            })
        }

        res.status(200).json({
            message: 'Events retrieved successfully',
            events: userEvents
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving events',
            error: error.message,
        })
    }
}

export default getUserEvents