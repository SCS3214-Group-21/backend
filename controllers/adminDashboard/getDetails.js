import User from "../../models/user.js";
import Blog from "../../models/blog.js";
import Package from "../../models/package.js";

const getDetails = async (req, res) => {
    try {
        // Total number of users
        const totalUsers = await User.count();

        // Total number of admins
        const totalAdmins = await User.count({ where: { is_admin: 1 } });
        const totalClients = await User.count({ where: { role: "client "} });

        // Total number of clients (non-admin users)
        const totalVendors = totalUsers - totalAdmins - totalClients;

        // Total number of blogs
        const totalBlogs = await Blog.count();

        // Total number of packages (all)
        const totalPackages = await Package.count();

        // Total number of active packages
        const totalActivePackages = await Package.count({ where: { is_enable: true } });

        // Response object
        const stats = {
            totalUsers,
            totalAdmins,
            totalClients,
            totalVendors,
            totalBlogs,
            totalPackages,
            totalActivePackages
        };

        // Send response
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching statistics', error: error.message });
    }
};

export default getDetails;
