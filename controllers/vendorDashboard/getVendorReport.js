import generateVendorReport from "../../utils/generateVendorReport.js";
import Blog from "../../models/blog.js";
import Package from "../../models/package.js";
import Booking from "../../models/booking.js";
// import User from "../../models/user.js"; // Assuming vendor info is tied to users
import sequelize from "../../config/dbConn.js";
import fs from 'fs';

const getVendorReport = async (req, res) => {
    try {
        const id = req.user.id;

        const totalBlogs = await Blog.count({ where: { id: id } });
        const totalPackages = await Package.count({ where: { vendor_id: id}})
        const totalBookings = await Booking.count({ where: { vendor_id: id, status: "accept"}})

        const popularBlogs = await Blog.findAll({
            attributes: ['blog_id', 'title', 'likes'],  // Only fetch blog_id and title
            where: {
                id: id  // Filter by the user ID (author)
            },
            order: [['likes', 'DESC']],  // Order by 'likes' in descending order
            limit: 5,  // Limit to the top 5 blogs
        });
        const popularPackages = await Booking.findAll({
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
        const mostPopularPackages = popularPackages.map(pkg => ({
            packageId: pkg.package_id,
            packageName: pkg.package_name,
            bookingCount: pkg.dataValues.booking_count,
        }));
        const stats = {
            totalBlogs,
            totalPackages,
            totalBookings,
            popularBlogs,
            mostPopularPackages,
        };

        // Generate the report
        const reportPath = await generateVendorReport(stats);

        // Send the generated report as a downloadable PDF
        res.download(reportPath, 'VendorDashboardReport.pdf', (err) => {
            if (!err) {
                fs.unlinkSync(reportPath); // Clean up the temporary file after download
            }
        });
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ success: false, message: 'Error generating report', error: error.message });
    }
};

export default getVendorReport;
