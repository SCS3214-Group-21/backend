import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url'; // Import for ES module compatibility
import createClient from '../controllers/client/profileController.js';
import getClient from '../controllers/client/getProfile.js'
import { isAuthorize } from '../middlewares/auth.js'; // Middleware for authentication

const client_router = express.Router();

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/client/profilepics')); // Ensure this path exists
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname.replace(/\s+/g, '-'); // Sanitize the filename
        cb(null, name);
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG and PNG images are allowed'), false);
    }
};

// Multer instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

// Define route with Multer middleware
client_router.patch('/create', isAuthorize, upload.single('pic'), createClient);
client_router.get('/', isAuthorize, getClient );

export default client_router;

// import express from 'express';
// import path from 'path';
// import multer from 'multer';
// import { fileURLToPath } from 'url';
// import { createOrUpdateClient, getClientProfile } from '../controllers/client/profileController.js';
// import { isAuthorize } from '../middlewares/auth.js';

// const client_router = express.Router();

// // Resolve __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Configure Multer storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/client/profilepics')),
//     filename: (req, file, cb) => {
//         const name = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
//         cb(null, name);
//     },
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         cb(new Error('Only JPEG and PNG images are allowed'), false);
//     }
// };

// const upload = multer({ storage, fileFilter });

// // Routes
// client_router.patch('/create', isAuthorize, upload.single('pic'), createOrUpdateClient);
// client_router.get('/', isAuthorize, getClientProfile);

// export default client_router;

