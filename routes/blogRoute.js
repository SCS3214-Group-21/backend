import express from 'express'; // Import express
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { isAuthorize } from '../middlewares/auth.js'; // Import isAuthorize middleware
import createBlog from '../controllers/blog/createBlog.js';
import getAllBlog from '../controllers/blog/getAllBlog.js';
import getUserBlogs from '../controllers/blog/getUserBlogs.js';
import getBlogById from '../controllers/blog/getBlogById.js';
import updateBlog from '../controllers/blog/updateBlog.js';
import deleteBlog from '../controllers/blog/deleteBlog.js';

// Determine the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer storage and file filter
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/images')); // Ensure this path exists and is writable
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const blog_router = express.Router(); // Create a new router instance

// Define routes with associated middlewares and controller functions
blog_router.post('/create', isAuthorize, upload.single('img'), createBlog);
blog_router.get('/get-all', isAuthorize, getAllBlog); // Route to get all blogs
blog_router.get('/my-blogs', isAuthorize, getUserBlogs); // Route to get blogs for the logged-in user
blog_router.get('/blog/:blogId', isAuthorize, getBlogById); // Route to get a specific blog by ID
blog_router.put('/blog/:blogId', isAuthorize, upload.single('img'), updateBlog); // Route to update a specific blog by ID
blog_router.delete('/blog/:blogId', isAuthorize, deleteBlog); // Route to delete a specific blog by ID

export default blog_router; // Export the router
