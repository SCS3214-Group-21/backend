import express from "express";
import { isAuthorize, isVendor } from "../middlewares/auth.js";
import getVendorDashboard from "../controllers/vendorDashboard/getVendorDashboard.js";
import getVendorReport from "../controllers/vendorDashboard/getVendorReport.js";

const vendorDashboardRoute = express.Router();

vendorDashboardRoute.get("/get", isAuthorize, isVendor, getVendorDashboard);

// Route to generate the vendor report
vendorDashboardRoute.get("/generate-report", isAuthorize, isVendor, getVendorReport);

export default vendorDashboardRoute;
