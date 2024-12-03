import express from 'express';
import getAllUsers from '../controllers/userManagement/getAllUsers.js';
import getUsersById from '../controllers/userManagement/getUsersById.js';
import getUserByIdRole from '../controllers/userManagement/getUserByIdRole.js';
import banUser from '../controllers/userManagement/BanUser.js';
import getAllBanUser from '../controllers/userManagement/getAllBanUser.js';
import unBanUser from '../controllers/userManagement/unBanUser.js';

const userManagementRoute = express.Router();

userManagementRoute.get('/all', getAllUsers);                // Get all users
userManagementRoute.get('/get/:id', getUsersById);            // Get a user by ID
userManagementRoute.post('/details', getUserByIdRole); // Get user details
userManagementRoute.post('/ban', banUser);           // Ban a user
userManagementRoute.delete('/delete/:user_id', unBanUser);       // Unban a user
userManagementRoute.get('/banned', getAllBanUser);      // Get all banned users


export default userManagementRoute;
