import Blog from "../../models/blog.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Determine the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to update a specific blog by its ID
const updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { title, description } = req.body;
        const userId = req.user.id; // ID of the logged-in user

        // Fetch the blog from the database
        const blog = await Blog.findOne({ where: { blog_id: blogId } });

        // Check if the blog exists
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if the logged-in user is the owner of the blog
        if (blog.id !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this blog' });
        }

        // Prepare updated data
        const updatedData = { title, description };

        // Handle file update if a new image is provided
        if (req.file) {
            // Delete the old image file if it exists
            const oldImagePath = path.join(__dirname, `../../uploads/images/${blog.img}`);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            // Update image path
            updatedData.img = `images/${req.file.filename}`;
        }

        // Update the blog
        const updatedBlog = await Blog.update(updatedData, {
            where: { blog_id: blogId },
            returning: true, // This will return the updated blog
        });

        // Check if the update was successful
        if (updatedBlog[0] === 0) {
            return res.status(400).json({ message: 'Blog update failed' });
        }

        res.status(200).json({
            message: 'Blog updated successfully',
            blog: updatedBlog[1][0], // Get the updated blog from the response
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating blog',
            error: error.message,
        });
    }
};

export default updateBlog;






























