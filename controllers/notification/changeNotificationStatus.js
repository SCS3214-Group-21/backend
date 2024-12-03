import Notification from "../../models/Notification.js"
import notification from "../../models/Notification.js";
import {where} from "sequelize";
import message from "../../models/Message.js";

const changeNotificationStatus = async (req, res) => {
    try {
        const { notificationId } = req.params
        const { viewed } = req.body
        const userId = req.user.id

        const notification = await Notification.findOne({ where: { notification_id: notificationId } })

        if (!notification) {
            return req.status(400).json({ message: 'Notification not found' })
        }

        if (notification.user_id !== userId) {
            return req.status(403).json({ message: 'Unauthorized' })
        }

        const updatedNotification = { viewed:viewed }

        const [affectedRows, updatedNotifications] = await Notification.update(updatedNotification, {
            where: {notification_id: notificationId},
            returning: true
        })

        if (affectedRows === 0) {
            return res.status(400).json({ message: 'Notification update failed' })
        }

        res.status(200).json({
            message: 'Notification Updated Successfully',
            notification: updatedNotifications[0],
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Error updating notification',
            error: error.message,
        })
    }
}

export default changeNotificationStatus