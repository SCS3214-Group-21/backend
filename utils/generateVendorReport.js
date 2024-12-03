import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateVendorReport = async (stats) => {
    try {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 750]);
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const black = rgb(0, 0, 0);
        const gray = rgb(0.5, 0.5, 0.5);

        // Title and header
        page.drawText('Vendor Dashboard Report', { x: 50, y: 700, size: 24, font, color: black });
        page.drawText(`Generated on: ${new Date().toLocaleString()}`, { x: 50, y: 670, size: 12, font, color: gray });

        // Vendor statistics
        const statsText = `
            Total Blogs: ${stats.totalBlogs}
            Total Packages: ${stats.totalPackages}
            Total Bookings: ${stats.totalBookings}
        `;

        const lines = statsText.trim().split('\n');
        let y = 630;
        for (let line of lines) {
            page.drawText(line.trim(), { x: 50, y, size: 14, font, color: black });
            y -= 20;
        }

        // Popular Blogs
        page.drawText('Most Popular Blogs (Top 5)', { x: 50, y: y - 20, size: 16, font, color: black });
        y -= 40;
        for (let blog of stats.popularBlogs) {
            page.drawText(`Title: ${blog.title} - Likes: ${blog.likes}`, { x: 50, y, size: 12, font, color: black });
            y -= 20;
        }

        // Popular Packages
        page.drawText('Most Popular Packages (Top 5)', { x: 50, y: y - 20, size: 16, font, color: black });
        y -= 40;
        for (let pkg of stats.mostPopularPackages) {
            page.drawText(`Package: ${pkg.package_name} - Bookings: ${pkg.booking_count}`, { x: 50, y, size: 12, font, color: black });
            y -= 20;
        }

        // Save and return the report path
        const pdfBytes = await pdfDoc.save();
        const reportPath = path.join(__dirname, 'vendor_report.pdf');
        fs.writeFileSync(reportPath, pdfBytes);

        console.log(`Report generated at: ${reportPath}`);
        return reportPath;
    } catch (error) {
        console.error('Error generating PDF report:', error);
        throw error;
    }
};

export default generateVendorReport;
