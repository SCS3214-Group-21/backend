import express from 'express';
import { isAuthorize, isVendor } from '../middlewares/auth.js';
import addBooking from '../controllers/booking/addBooking.js'
import getBooking from '../controllers/booking/getBooking.js';
import getBookingByVendor from '../controllers/booking/getBookingByVendor.js';
import updateBookingStatus from '../controllers/booking/updateBookingStatus.js'
import searchBookingByType from '../controllers/booking/searchBookingByType.js';

const bookingRouter = express.Router();
// Grouped routes for better clarity
bookingRouter.post('/create', isAuthorize, addBooking); // Create a new quotation

// Specific quotation routes
bookingRouter.get('/getAll', isAuthorize, getBooking); // Get a specific quotation by ID


bookingRouter.get('/vendor/orders', isAuthorize, getBookingByVendor); // Get all quotations for a vendor


bookingRouter.patch('/updateStatus/:id', isAuthorize, updateBookingStatus);

bookingRouter.get('/searchByType', isAuthorize, searchBookingByType);


export default bookingRouter;
