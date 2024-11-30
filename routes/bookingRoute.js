import express from 'express';
import { isAuthorize, isVendor } from '../middlewares/auth.js';
import addBooking from '../controllers/booking/addBooking.js'
import getBooking from '../controllers/booking/getBooking.js';
import getClientQuotations from '../controllers/quotation/getClientQuotations.js';
import getVendorQuotations from '../controllers/quotation/getVendorQuotations.js';
import updateQuotationStatus from '../controllers/quotation/updateQuotationStatus.js';

const bookingRouter = express.Router();
// Grouped routes for better clarity
bookingRouter.post('/create', isAuthorize, addBooking); // Create a new quotation

// Specific quotation routes
bookingRouter.get('/getAll', isAuthorize, getBooking); // Get a specific quotation by ID

// Client and Vendor quotation routes
bookingRouter.get('/client', isAuthorize, getClientQuotations); // Get all quotations for a client
bookingRouter.get('/vendor', isAuthorize, getVendorQuotations); // Get all quotations for a vendor

// Quotation status update
bookingRouter.patch('/status/:quotationId', isAuthorize, isVendor, updateQuotationStatus); // Update quotation status


export default bookingRouter;
