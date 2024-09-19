import { validationResult } from 'express-validator'; // Update import for express-validator
import User from '../../models/user.js'; // Update import for User model
import PasswordReset from '../../models/passwordReset.js'; // Update import for PasswordReset model
import randomstring from 'randomstring'; // Update import for randomstring
import sendMail from '../../middlewares/sendMail.js'; // Update import for sendMail

const forgetPassword = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).send({ message: "Email does not exist!" });
        }

        const randomString = randomstring.generate();
        const mailSubject = 'Reset Password';
        const content = `<p>Hi, Please <a href="${process.env.APP_URL}/reset-password?token=${randomString}">Click Here</a> to reset your password.</p>`;

        await sendMail(req.body.email, mailSubject, content);

        await PasswordReset.destroy({ where: { email: user.email } });
        await PasswordReset.create({ email: user.email, token: randomString });

        return res.status(200).send({ message: "Reset password email sent successfully!" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export default forgetPassword;