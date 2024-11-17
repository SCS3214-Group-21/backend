import express from "express";
import { sendMessage,getMessages } from '../controllers/chat/message.controller.js';
//import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:id",sendMessage) //go through the middleware befare run the sendMessage function bcz check whether user logged in or not
router.get("/:id",getMessages) 

export default router;