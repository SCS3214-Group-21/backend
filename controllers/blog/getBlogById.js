import Blog from "../../models/blog.js";

// Function to get a specific blog by its ID
const getBlogById = async (req, res) => {
    try {
        // Extract blog ID from the request parameters
        const { blogId } = req.params;

        // Fetch the blog from the database
        const blog = await Blog.findOne({ where: { blog_id: blogId } });

        // Check if the blog exists
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Respond with the blog details
        res.status(200).json({
            message: 'Blog retrieved successfully',
            blog
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving blog',
            error: error.message,
        });
    }
};

export default getBlogById;