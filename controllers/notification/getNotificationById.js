import Notification from "../../models/Notification.js"

const getNotificationById = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findOne({ where: { notification_id: notificationId } })

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' })
        }

        res.status(200).json({
            message: 'Notification retrieved successfully',
            notification: notification,
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Notification retrieving notification',
            error: error.message,
        })
    }
}

export default getNotificationById