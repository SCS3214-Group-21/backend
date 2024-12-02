import Notification from "../../models/Notification.js"

export const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id

        const userNotifications = await Notification.findAll({ where: { user_id: userId } })

        if (userNotifications.length === 0) {
            return res.status(200).json({
                message: "No Notifications for this user",
                notifications: []
            })
        }

        res.status(200).json({
            message: 'Notification retrieved successfully',
            notifications: userNotifications
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving notifications',
            error: error.message,
        })
    }
}

export default getUserNotifications