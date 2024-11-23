// import express from "express";
// import protectRoute from "../middleware/protectRoute.js";
// import { getUsersForSidebar } from "../controllers/user.controller.js";

// const router = express.Router();

// router.get("/",protectRoute ,getUsersForSidebar)

// export default router;

import express from "express";
//import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/chat/user.controller.js";
import { isAuthorize } from '../middlewares/auth.js';

const router = express.Router();

router.get("/",isAuthorize,getUsersForSidebar)

export default router;


