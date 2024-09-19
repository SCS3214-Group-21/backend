import { validationResult } from 'express-validator'; // Update import for express-validator
import bcrypt from 'bcryptjs'; // Update import for bcryptjs
import User from '../../models/user.js'; // Update import for User model
import jwt from 'jsonwebtoken'; // Update import for jsonwebtoken
const { JWT_SECRET } = process.env; // No change needed here

const login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).send({ msg: 'Email incorrect!' });
        }

        if (user.is_verified === 0){
            return res.status(401).send({ msg: 'Please verified email before login' });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            return res.status(401).send({ msg: 'Password incorrect!' });
        }

        const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, JWT_SECRET, { expiresIn: '1h' });

        // Update the last login time
        await User.update({ last_log: new Date() }, { where: { id: user.id } });

        return res.status(200).send({
            msg: 'Logged in successfully',
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role  // Ensure the 'role' field is managed properly in your User model
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ msg: err.message });
    }
};

export default login;