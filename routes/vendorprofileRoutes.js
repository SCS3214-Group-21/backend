import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import updateProfile from '../controllers/vendorProfile/updateProfile.js';
import { isAuthorize, isVendor } from '../middlewares/auth.js';
import getAllProfile from '../controllers/vendorProfile/getAllProfile.js';
import getProfileById from '../controllers/vendorProfile/getProfileById.js';
import getProfileByVendors from '../controllers/vendorProfile/getProfileByVendors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Check field name to determine destination
        if (file.fieldname === 'pic') {
            cb(null, path.join(__dirname, '../uploads/vendor/pic')); // Folder for `pic`
        } else if (file.fieldname === 'images') {
            cb(null, path.join(__dirname, '../uploads/vendor/images')); // Folder for `images`
        } else {
            cb(new Error('Invalid field name'), null);
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname); // Unique filename
    }
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// const upload = multer({ storage, fileFilter });
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
}).fields([
    { name: 'pic', maxCount: 1 },          // Single file for "pic"
    { name: 'images', maxCount: 10 }      // Multiple files for "images"
]);


const vendorRouter = express.Router();

// vendorRouter.post('/update/:vendor_id', isAuthorize, isVendor, upload.single('pic'), upload.array('images', 10), updateProfile);
vendorRouter.post('/update', isAuthorize, isVendor, upload, updateProfile);
vendorRouter.get('/get-all', isAuthorize, getAllProfile )
vendorRouter.get('/get-one', isAuthorize, getProfileById)
vendorRouter.get('/get-vendors/:vendor', isAuthorize, getProfileByVendors)



export default vendorRouter;
