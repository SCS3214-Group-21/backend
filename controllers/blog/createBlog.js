import Blog from "../../models/blog.js";

// Function to create a new blog post
const createBlog = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Ensure a file is provided
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const newBlog = await Blog.create({
            id: req.user.id, // Assuming the authenticated user's ID is attached to the request
            title,
            img: `images/${req.file.filename}`,  // Correctly handle file upload path
            description
        });

        // creating a notification
        await Notification.create({
            title: `New Blog Created`,
            description: `Description: ${title}`,
            priority: 'normal',
            viewed: false,
            user_id: req.user.id,
        })

        res.status(201).json({
            message: 'Blog created successfully',
            blog: newBlog,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating blog',
            error: error.message,
        });
    }
};

export default createBlog;