import Blog from "../../models/blog.js";
import Notification from "../../models/Notification.js"
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Determine the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to delete a specific blog by its ID
const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user.id; // ID of the logged-in user

        // Fetch the blog from the database
        const blog = await Blog.findOne({ where: { blog_id: blogId } });

        // Check if the blog exists
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if the logged-in user is the owner of the blog
        if (blog.id !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this blog' });
        }

        // Delete the old image file if it exists
        const imagePath = path.join(__dirname, `../../uploads/images/${blog.img}`);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Delete the blog from the database
        await Blog.destroy({ where: { blog_id: blogId } });

        // creating a notification
        await Notification.create({
            title: `Blog updated successfully`,
            description: `Description: ${blog.title} has been deleted`,
            priority: 'normal',
            viewed: false,
            user_id: req.user.id,
        })

        res.status(200).json({
            message: 'Blog deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting blog',
            error: error.message,
        });
    }
};

export default deleteBlog;