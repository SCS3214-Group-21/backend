import express from 'express';
import resetPassword from '../controllers/auth/resetPassword.js';
import resetPasswordLoad from '../controllers/auth/resetPasswordLoad.js';
import verifyMail from '../controllers/auth/verifyMail.js';

const user_route = express(); // Create an Express application instance

user_route.set('view engine', 'ejs'); // Set the view engine to EJS
user_route.set('views', './views'); // Set the directory for view templates
user_route.use(express.static('public')); // Serve static files from the 'public' directory

// Define routes and their corresponding controller methods
user_route.get('/mail-verification', verifyMail);
user_route.get('/reset-password', resetPasswordLoad);
user_route.post('/reset-password', resetPassword);

export default user_route; // Export the router
