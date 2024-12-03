import express from "express"
import { isAuthorize } from "../middlewares/auth.js"

import createNotification from "../controllers/notification/createNotification.js"
import getUserNotifications from "../controllers/notification/getUserNotifications.js"
import getNotificationById from "../controllers/notification/getNotificationById.js"
import changeNotificationStatus from "../controllers/notification/changeNotificationStatus.js"
import deleteNotification from "../controllers/notification/deleteNotification.js"

const notification_router = express.Router()

notification_router.post('/create', isAuthorize, createNotification)
notification_router.get('/my-notification', isAuthorize, getUserNotifications)
notification_router.get('/:notificationId', isAuthorize, getNotificationById)
notification_router.put('/:notificationId', isAuthorize, changeNotificationStatus)
notification_router.delete('/:notificationId', isAuthorize, deleteNotification)

export default notification_router