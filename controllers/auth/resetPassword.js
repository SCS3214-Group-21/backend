import bcrypt from 'bcryptjs'; // Update import for bcryptjs
import User from '../../models/user.js'; // Update import for User model
import PasswordReset from '../../models/passwordReset.js'; // Update import for PasswordReset model

const resetPassword = async (req, res) => {
    if (req.body.password !== req.body.confirm_password) {
        return res.render('reset-password', { error_message: 'Passwords do not match', user: { id: req.body.user_id, email: req.body.email } });
    }

    try {
        const hash = await bcrypt.hash(req.body.confirm_password, 10);
        await User.update({ password: hash }, { where: { id: req.body.user_id } });
        await PasswordReset.destroy({ where: { email: req.body.email } });

        return res.render('message', { message: 'Password reset successfully!' });
    } catch (err) {
        return res.status(500).send({ msg: err.message });
    }
};

export default resetPassword;