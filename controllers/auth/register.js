import { validationResult } from 'express-validator'; // Update import for express-validator
import bcrypt from 'bcryptjs'; // Update import for bcryptjs
import User from '../../models/user.js'; // Update import for User model
import randomstring from 'randomstring'; // Update import for randomstring
import sendMail from '../../middlewares/sendMail.js'; // Update import for sendMail

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userExists = await User.findOne({ where: { email: req.body.email.toLowerCase() } });
        if (userExists) {
            return res.status(409).send({ msg: 'This email is already in use!' });
        }

        const hash = await bcrypt.hash(req.body.password, 10);
        const token = randomstring.generate();
        const newUser = await User.create({
            email: req.body.email,
            password: hash,
            token: token,
            role: req.body.role  // Assume role is part of the User model
        });

        const mailSubject = 'Verify Your Email Address';
        const content = `<p>Dear Customer,</p>
            <p>Thank you for signing up with DreamWed. Please verify your email address to complete your registration and start using our services.</p>
            <p>Click the link below to verify your email:</p>
            <p><a href="${process.env.APP_URL}/mail-verification?token=${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
            <p>If the button above does not work, you can also copy and paste the following link into your browser:</p>
            <p>${process.env.APP_URL}/mail-verification?token=${token}</p>
            <p>If you did not create an account with us, please ignore this email.</p>
            <p>Thank you for choosing DreamWed!</p>
            <p>Best regards,<br/>DreamWed Team</p>`;
        sendMail(req.body.email, mailSubject, content);

        return res.status(201).send({
            msg: 'User registered successfully! Please check your email to verify your account.',
            userId: newUser.id  // Assuming you want to return the user ID
        });
    } catch (err) {
        return res.status(500).send({ msg: err.message });
    }
};

export default register;