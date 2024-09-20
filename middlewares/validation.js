import { check } from 'express-validator'; // Import check from express-validator

export const signUpValidation = [
    check('role', 'Role is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
];

export const loginValidation = [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
];

export const forgetValidation = [
    check('email', 'Please enter a valid email').isEmail()
];
