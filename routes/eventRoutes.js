import express from "express"
import { isAuthorize } from "../middlewares/auth.js"

import createEvent from "../controllers/events/createEvent.js";
import deleteEvent from "../controllers/events/deleteEvent.js";
import getEventById from "../controllers/events/getEventById.js";
import getUserEvents from "../controllers/events/getUserEvents.js";
import updateEvent from "../controllers/events/updateEvent.js";

const eventRouter = express.Router()

eventRouter.post('/create', isAuthorize, createEvent)
eventRouter.delete('/eventId', isAuthorize, deleteEvent)
eventRouter.get('/eventId', isAuthorize, getEventById)
eventRouter.post('/eventId', isAuthorize, updateEvent)
eventRouter.get('/my-events', isAuthorize, getUserEvents)

export default eventRouter
