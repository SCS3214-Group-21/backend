import express from 'express';
import getAllUsers from '../controllers/userManagement/getAllUsers.js';
import getUsersById from '../controllers/userManagement/getUsersById.js';
import getUserByIdRole from '../controllers/userManagement/getUserByIdRole.js';
import banUser from '../controllers/userManagement/BanUser.js';
import { isAdmin, isAuthorize } from '../middlewares/auth.js';
import getAllBanUser from '../controllers/userManagement/getAllBanUser.js';
import unBanUser from '../controllers/userManagement/unBanUser.js';

const userManagementRoute = express.Router();

userManagementRoute.get('/all', isAuthorize, isAdmin, getAllUsers);                // Get all users
userManagementRoute.get('/get/:id', isAuthorize, isAdmin, getUsersById);            // Get a user by ID
userManagementRoute.post('/details', isAuthorize, isAdmin, getUserByIdRole); // Get user details
userManagementRoute.post('/ban', isAuthorize, isAdmin, banUser);           // Ban a user
userManagementRoute.delete('/delete/:user_id', isAuthorize, isAdmin, unBanUser);       // Unban a user
userManagementRoute.get('/banned', getAllBanUser);      // Get all banned users


export default userManagementRoute;
