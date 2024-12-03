import express from 'express'; // Import express
import { signUpValidation, loginValidation, forgetValidation } from '../middlewares/validation.js'; // Import validation middlewares
// import { register, login, getUser, forgetPassword } from '../controllers/userController.js'; // Import named exports
// import { isAuthorize } from '../middlewares/auth.js'; // Import isAuthorize middleware
import register from '../controllers/auth/register.js';
import login from '../controllers/auth/login.js';
import forgetPassword from '../controllers/auth/forgetPassword.js';
import { isAuthorize } from "../middlewares/auth.js";
import getUserEmail from '../controllers/auth/fetchEmailForHeader.js';

const router = express.Router(); // Create a new router instance

// Define routes with associated middlewares and controller functions
router.post('/register', signUpValidation, register);
router.post('/login', loginValidation, login);
// router.get('/get-user', isAuthorize, getUser);
router.post('/forget-password', forgetValidation, forgetPassword);
router.get('/email',isAuthorize,getUserEmail);

export default router; // Export the router
