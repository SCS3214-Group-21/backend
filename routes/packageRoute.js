import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { isAuthorize, isVendor } from '../middlewares/auth.js';
import createPackage from '../controllers/package/createPackage.js';
import getPackageById from '../controllers/package/getPackageById.js';
import getUserPackages from '../controllers/package/getUserPackages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, path.join(__dirname, '../uploads/packages'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '_' + file.originalname;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

const package_router = express.Router();

package_router.post('/create', isAuthorize, isVendor, upload.single('img'), createPackage);
package_router.get('/package/:packageId', isAuthorize, isVendor, getPackageById);
package_router.get('/my-package', isAuthorize, isVendor, getUserPackages);

export default package_router;