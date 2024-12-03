import Blog from "../../models/blog.js";

// Function to get all blog posts
export const getAllBlog = async (req, res) => {
    try {
        // Fetch all blogs from the database
        const blogs = await Blog.findAll();

        // Check if there are any blogs
        if (blogs.length === 0) {
            return res.status(200).json({ 
                message: 'No blogs found',
                blogs 
            });
        }

        // Respond with the list of blogs
        res.status(200).json({
            message: 'Blogs retrieved successfully',
            blogs
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving blogs',
            error: error.message,
        });
    }
};

export default getAllBlog;