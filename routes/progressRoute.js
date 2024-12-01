import express from "express";
import { isAuthorize } from "../middlewares/auth.js";
import getProgressById from "../controllers/progress/getProgressById.js";
import updateProgress from "../controllers/progress/updateProgress.js";
import getEnableBudget from "../controllers/progress/getEnableBudget.js";

const progressRouter = express.Router();

progressRouter.get("/get-one/:plan_id", isAuthorize, getProgressById);
progressRouter.put("/update/:plan_id", isAuthorize, updateProgress);
progressRouter.get("/enable", isAuthorize, getEnableBudget);

export default progressRouter;
