import Vendor from '../../models/vendor.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const updateProfile = async (req, res) => {
    try {
        // Access uploaded files
        const profilePic = req.files?.pic?.[0]?.filename || null; // Single file for 'pic'
        const uploadedImages = req.files?.images?.map(file => file.filename) || []; // Array of filenames for 'images'

        // Access other fields in req.body
        const {
            first_name,
            last_name,
            business_name,
            contact_number,
            email,
            address,
            city,
            branch,
            description
        } = req.body;

        // Ensure required fields are present
        // if (!first_name || !last_name || !business_name) {
        //     return res.status(400).json({ message: "First name, last name, and business name are required." });
        // }

        // Convert JSON fields like `branch` and validate
        let parsedBranch = [];
        try {
            parsedBranch = JSON.parse(branch || '[]');
        } catch {
            return res.status(400).json({ message: "Invalid JSON format for branch." });
        }

        // Find existing vendor
        const vendor = await Vendor.findOne({ where: { id: req.user.id } });

        if (vendor) {
            // Update existing vendor
            await vendor.update({
                first_name,
                last_name,
                business_name,
                contact_number,
                email,
                address,
                city,
                branch: parsedBranch,
                description,
                pic: profilePic || vendor.pic, // Keep old pic if no new pic uploaded
                images: uploadedImages.length > 0 ? uploadedImages : vendor.images, // Keep old images if none uploaded
            });
            return res.status(200).json({ message: "Vendor profile updated successfully." });
        } else {
            // Create new vendor
            await Vendor.create({
                id: req.user.id,
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
            });
            return res.status(201).json({ message: "Vendor profile created successfully." });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export default updateProfile;
