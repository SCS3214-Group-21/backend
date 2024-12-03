import generateAdminReport from "../../utils/generateAdminReport.js";
import User from "../../models/user.js";
import Package from "../../models/package.js";
import Blog from "../../models/blog.js";
import fs from 'fs';

const getDashboardReport = async (req, res) => {
    try {
        const totalAdmins = await User.count({ where: { is_admin: 1 } });
        const totalClients = await User.count({ where: { role: "client" } });

        const stats = {
            totalUsers: await User.count(),
            totalAdmins,
            totalClients,
            totalVendors: await User.count() - totalAdmins - totalClients,
            totalBlogs: await Blog.count(),
            totalPackages: await Package.count(),
            totalActivePackages: await Package.count({ where: { is_enable: true } }),
        };

        const reportPath = await generateAdminReport(stats);

        res.download(reportPath, 'AdminDashboardReport.pdf', (err) => {
            if (!err) {
                fs.unlinkSync(reportPath); // Clean up the temporary file
            }
        });
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ success: false, message: 'Error generating report', error: error.message });
    }
};

export default getDashboardReport;
