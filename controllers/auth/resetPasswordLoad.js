import User from '../../models/user.js'; // Update import for User model
import PasswordReset from '../../models/passwordReset.js'; // Update import for PasswordReset model


const resetPasswordLoad = async (req, res) => {
    const token = req.query.token;

    try {
        const resetEntry = await PasswordReset.findOne({ where: { token } });
        if (!resetEntry) {
            return res.render('404');
        }

        const user = await User.findOne({ where: { email: resetEntry.email } });
        return res.render('reset-password', { user: user });
    } catch (err) {
        return res.status(500).send({ msg: err.message });
    }
};

export default resetPasswordLoad;