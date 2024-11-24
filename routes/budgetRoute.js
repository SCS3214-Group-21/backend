import express from "express";
import getMinPackages from "../controllers/Budget/getMinPackages.js";
import createBudget from "../controllers/Budget/createBudget.js";
import getBudget from "../controllers/Budget/getBudget.js";
import { isAuthorize } from "../middlewares/auth.js";

const vendorRouter = express.Router();

vendorRouter.get("/get-min", isAuthorize, getMinPackages);
vendorRouter.post("/create-budget", isAuthorize, createBudget);
vendorRouter.get("/get-budget/:id", isAuthorize, getBudget)

export default vendorRouter;
