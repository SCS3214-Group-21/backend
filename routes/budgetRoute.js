import express from "express";
import getMinPackages from "../controllers/Budget/getMinPackages.js";
import { isAuthorize } from "../middlewares/auth.js";

const vendorRouter = express.Router();

vendorRouter.get("/get-min", isAuthorize, getMinPackages);

export default vendorRouter;
