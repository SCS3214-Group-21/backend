import Blog from "../../models/blog.js";

export const getUserBlogs = async (req, res) => {
    try {
        // Extract user ID from request object
        const userId = req.user.id;

        // Fetch all blogs associated with the logged-in user
        const userBlogs = await Blog.findAll({ where: { id: userId } });

        // Check if there are any blogs for the user
        if (!userBlogs.length) {
            return res.status(404).json({ message: 'No blogs found for this user' });
        }

        // Respond with the list of blogs
        res.status(200).json({
            message: 'Blogs retrieved successfully',
            blogs: userBlogs
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving blogs',
            error: error.message,
        });
    }
};

export default getUserBlogs;