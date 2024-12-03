import express from "express";
import getDetails from "../controllers/adminDashboard/getDetails.js";
import { isAdmin, isAuthorize } from "../middlewares/auth.js";
import getDashboardReport from "../controllers/adminDashboard/getDashboardReport.js";

const adminDashboardRoute = express.Router();

adminDashboardRoute.get("/get", isAuthorize, isAdmin, getDetails);

// Ensure CORS headers are applied to the report generation route as well
adminDashboardRoute.get("/generate-report", isAuthorize, isAdmin, getDashboardReport);

export default adminDashboardRoute;
