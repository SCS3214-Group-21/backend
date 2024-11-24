import express from "express";
import getMinPackages from "../controllers/Budget/getMinPackages.js";
import createBudget from "../controllers/Budget/createBudget.js";
import getBudget from "../controllers/Budget/getBudget.js";
import getInitialBudget from "../controllers/Budget/getInitialBudget.js";
import updateBudget from "../controllers/Budget/updateBudget.js";
import { isAuthorize } from "../middlewares/auth.js";

const vendorRouter = express.Router();

vendorRouter.get("/get-min", isAuthorize, getMinPackages);
vendorRouter.post("/create-budget", isAuthorize, createBudget);
vendorRouter.get("/get-budget/:id", isAuthorize, getBudget);
vendorRouter.get("/get-initial/:id", isAuthorize, getInitialBudget);
vendorRouter.put("/update-budget/:plan_id", isAuthorize, updateBudget);

export default vendorRouter;
