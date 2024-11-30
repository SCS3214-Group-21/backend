import express from 'express';
import { isAuthorize, isVendor } from '../middlewares/auth.js';
import addQuotation from '../controllers/quotation/addQuotation.js';
import getQuotationById from '../controllers/quotation/getQuotationById.js';
import getClientQuotations from '../controllers/quotation/getClientQuotations.js';
import getVendorQuotations from '../controllers/quotation/getVendorQuotations.js';
import updateQuotationStatus from '../controllers/quotation/updateQuotationStatus.js';

const quotationRouter = express.Router();
// Grouped routes for better clarity
quotationRouter.post('/create', isAuthorize, addQuotation); // Create a new quotation

// Specific quotation routes
quotationRouter.get('/id/:quotationId', isAuthorize, getQuotationById); // Get a specific quotation by ID

// Client and Vendor quotation routes
quotationRouter.get('/client', isAuthorize, getClientQuotations); // Get all quotations for a client
quotationRouter.get('/vendor', isAuthorize, getVendorQuotations); // Get all quotations for a vendor

// Quotation status update
quotationRouter.patch('/status/:quotationId', isAuthorize, isVendor, updateQuotationStatus); // Update quotation status


export default quotationRouter;
