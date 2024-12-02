import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateAdminReport = async (stats) => {
    try {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 750]);
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const black = rgb(0, 0, 0);
        const gray = rgb(0.5, 0.5, 0.5);

        page.drawText('Admin Dashboard Report', { x: 50, y: 700, size: 24, font, color: black });
        page.drawText(`Generated on: ${new Date().toLocaleString()}`, { x: 50, y: 670, size: 12, font, color: gray });

        const statsText = `
            Total Users: ${stats.totalUsers}
            Total Admins: ${stats.totalAdmins}
            Total Clients: ${stats.totalClients}
            Total Vendors: ${stats.totalVendors}
            Total Blogs: ${stats.totalBlogs}
            Total Packages: ${stats.totalPackages}
            Total Active Packages: ${stats.totalActivePackages}
        `;

        const lines = statsText.trim().split('\n');
        let y = 630;
        for (let line of lines) {
            page.drawText(line.trim(), { x: 50, y, size: 14, font, color: black });
            y -= 20;
        }

        const pdfBytes = await pdfDoc.save();
        const reportPath = path.join(__dirname, 'report.pdf');
        fs.writeFileSync(reportPath, pdfBytes);

        console.log(`Report generated at: ${reportPath}`);
        return reportPath;
    } catch (error) {
        console.error('Error generating PDF report:', error);
        throw error;
    }
};

export default generateAdminReport;
