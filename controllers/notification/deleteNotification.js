import Notification from "../../models/Notification.js"
import message from "../../models/Message.js";

const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params
        const userId = req.user.id

        const notification = await Notification.findOne( { where: {notification_id: notificationId } })
        if (!notification) {
            return res.status(400).json({ message: 'Notification not found' })
        }

        if ( notification.user_id !== userId ) {
            return res.status(403).json({ message: 'Unauthorized' })
        }

        await Notification.destroy({ where: { notification_id: notificationId} })

        res.status(200).json({
            message: 'Notification deleted successfully'
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Error deleting notification',
            error: error.message
        })
    }
}

export default deleteNotification