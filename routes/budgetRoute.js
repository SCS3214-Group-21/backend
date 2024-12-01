import express from "express";
import getMinPackages from "../controllers/Budget/getMinPackages.js";
import createBudget from "../controllers/Budget/createBudget.js";
import getBudget from "../controllers/Budget/getBudget.js";
import getInitialBudget from "../controllers/Budget/getInitialBudget.js";
import updateBudget from "../controllers/Budget/updateBudget.js";
import getAllMinBudget from "../controllers/Budget/getAllMinBudget.js";
import getAllBudget from "../controllers/Budget/getAllBudget.js";
import { isAuthorize } from "../middlewares/auth.js";
import updateBudgetStatus from "../controllers/Budget/updateBudgetStatus.js";
import getBudgetById from "../controllers/Budget/getBudgetById.js";
import deleteBudget from "../controllers/Budget/deleteBudget.js";
import getBudgetAmount from "../controllers/Budget/getBudgetAmount.js";
import updateBudgetAmount from "../controllers/Budget/updateBudgetAmount.js";

const vendorRouter = express.Router();

vendorRouter.get("/get-min", isAuthorize, getMinPackages);
vendorRouter.post("/create-budget", isAuthorize, createBudget);
vendorRouter.get("/get-budget/:id", isAuthorize, getBudget);
vendorRouter.get("/get-initial/:id", isAuthorize, getInitialBudget);
vendorRouter.put("/update-budget/:plan_id", isAuthorize, updateBudget);
vendorRouter.post("/find-packages", isAuthorize, getAllMinBudget);
vendorRouter.get("/get-all", isAuthorize, getAllBudget);
vendorRouter.put("/budget-status/:id", isAuthorize, updateBudgetStatus);
vendorRouter.get('/get-one/:id', isAuthorize, getBudgetById);
vendorRouter.delete('/delete/:id', isAuthorize, deleteBudget);
vendorRouter.get('/get-amount', isAuthorize, getBudgetAmount);
vendorRouter.put('/update-amount', isAuthorize, updateBudgetAmount)

export default vendorRouter;
