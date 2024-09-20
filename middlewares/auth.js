import jwt from 'jsonwebtoken'; // Import jsonwebtoken to verify the token
import User from '../models/user.js'; // Import the User model
const { JWT_SECRET } = process.env; // Get the secret key from environment variables

export const isAuthorize = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({
                message: 'Authorization token missing or malformed',
            });
        }

        // Extract the token
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: 'Token not provided',
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: 'Invalid token',
            });
        }

        // Fetch the user from the database
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // Attach the user object to the request for further use
        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error',
        });
    }
};


export const isAdmin = async (req, res, next) => {
    try {
        // Assuming `isAuthorize` has already verified the token and set req.user
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Access forbidden: Admins only',
            });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error',
        });
    }
};


export const isVendor = async (req, res, next) => {
    try {
        if (req.user.role === 'admin' || req.user.role === 'client') {
            return res.status(403).json({
                message: 'Access forbidden: Vendors only',
            });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error',
        });
    }
};


export const isClient = async (req, res, next) => {
    try {
        if (req.user.role !== 'client') {
            return res.status(403).json({
                message: 'Access forbidden: Clients only',
            });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error',
        });
    }
};
