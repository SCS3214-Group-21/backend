import Vendor from '../../models/vendor.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Payment from '../../models/payment.js';
import sequelize from '../../config/dbConn.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Unified user ID access.

        const profilePic = req.files?.pic?.[0]?.filename || null;
        const uploadedImages = Array.isArray(req.files?.images)
            ? req.files.images.map(file => file.filename)
            : [];

        const {
            first_name,
            last_name,
            business_name,
            contact_number,
            email,
            address,
            city,
            branch,
            description,
            payment_key,
        } = req.body;

        // if (!first_name || !last_name || !business_name) {
        //     return res.status(400).json({ message: "First name, last name, and business name are required." });
        // }

        let parsedBranch = [];
        try {
            parsedBranch = JSON.parse(branch || '[]');
        } catch {
            return res.status(400).json({ message: "Invalid JSON format for branch." });
        }

        const transaction = await sequelize.transaction(); // Ensure atomic updates
        try {
            const vendor = await Vendor.findOne({ where: { id: userId } });
            const payment = await Payment.findOne({ where: { user_id: userId } });

            if (vendor) {
                await vendor.update(
                    {
                        first_name,
                        last_name,
                        business_name,
                        contact_number,
                        email,
                        address,
                        city,
                        branch: parsedBranch,
                        description,
                        pic: profilePic || vendor.pic,
                        images: uploadedImages.length > 0 ? uploadedImages : vendor.images,
                    },
                    { transaction }
                );
                await Payment.update(
                    { payment_key },
                    { where: { user_id: userId }, transaction }
                );
            } else {
                await Vendor.create(
                    {
                        id: userId,
                        first_name,
                        last_name,
                        business_name,
                        contact_number,
                        email,
                        address,
                        city,
                        branch: parsedBranch,
                        description,
                        pic: profilePic,
                        images: uploadedImages,
                    },
                    { transaction }
                );
                await Payment.create(
                    { user_id: userId, payment_key },
                    { transaction }
                );
            }

            await transaction.commit();
            return res.status(200).json({ message: "Vendor profile updated successfully." });
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export default updateProfile;
