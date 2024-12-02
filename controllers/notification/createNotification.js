import Notification from "../../models/Notification.js"

const createNotification = async (req, res) => {
    try {
        const {title, description, priority} = req.body

        if (!title) {
            return res.status(400).json({ message: 'Title is required' })
        }

        const newNotification = await Notification.create({
            title: title,
            description: description,
            user_id: req.user.id,
            priority: priority,
        })

        res.status(201).json({
            message: 'Notification createed successfully',
            notification: newNotification,
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Notification created successfully',
            error: error.message,
        })
    }
}

export default createNotification