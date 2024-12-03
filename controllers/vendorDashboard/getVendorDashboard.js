import Blog from "../../models/blog.js";
import Package from "../../models/package.js";
import Booking from "../../models/booking.js";
import sequelize from "../../config/dbConn.js";

const getVendorDashboard = async (req, res) => {
    const id = req.user.id;

    const blogs = await Blog.count({ where: { id: id } });
    const packages = await Package.count({ where: { vendor_id: id}})
    const booking = await Booking.count({ where: { vendor_id: id, status: "accept"}})

    const popularBlogs = await Blog.findAll({
        attributes: ['blog_id', 'title', 'likes'],  // Only fetch blog_id and title
        where: {
            id: id  // Filter by the user ID (author)
        },
        order: [['likes', 'DESC']],  // Order by 'likes' in descending order
        limit: 5,  // Limit to the top 5 blogs
    });
    const mostPopularPackages = await Booking.findAll({
        attributes: [
            'package_id',
            'package_name',
            [sequelize.fn('COUNT', sequelize.col('package_id')), 'booking_count'],  // Count occurrences of each package
        ],
        where: {
            vendor_id: 34, // Assuming vendor_id = 34 represents the user
        },
        group: ['package_id', 'package_name'],  // Group by package_id and package_name
        order: [
            [sequelize.fn('COUNT', sequelize.col('package_id')), 'DESC'],  // Sort by the count in descending order
            ['package_id', 'ASC'],  // If counts are equal, sort by package_id in ascending order
        ],
        limit: 5,  // Limit to top 5 packages
    });
    

    // Map the result to get package_name and booking_count
    const popularPackages = mostPopularPackages.map(pkg => ({
        packageId: pkg.package_id,
        packageName: pkg.package_name,
        bookingCount: pkg.dataValues.booking_count,
    }));
    res.status(200).json({
        booking, 
        blogs,
        packages,
        popularPackages,
        popularBlogs,
    })
};

export default getVendorDashboard;