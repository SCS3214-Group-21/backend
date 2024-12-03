import BanUsers from '../../models/banusers.js';// Assuming the BanUsers model is in the 'models' folder
import User from '../../models/user.js';
import sendMail from '../../middlewares/sendMail.js';

// Delete Ban User by user_id
const unBanUser = async (req, res) => {
    const { user_id } = req.params;  // Grab user_id from request params

    try {
        // Delete ban user record by user_id
        const banUser = await BanUsers.destroy({
            where: { user_id: user_id }
        });

        // Check if any record was deleted
        if (banUser === 0) {
            return res.status(404).json({ message: 'Ban not found for the specified user_id' });
        }

        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const mailSubject = 'Your Account Ban Has Been Lifted'
        const content = `
            <p>Dear Customer,</p>
            <p>We are pleased to inform you that the ban on your account has been lifted. You may now log in and continue using our services as usual.</p>
            <p>We appreciate your patience and understanding.</p>
            <p>If you encounter any issues, please feel free to contact our support team at <a href="mailto:dreamwed@gmail.com">dreamwed@gmail.com</a>.</p>
            <p>Best regards,<br/>DreamWed Team</p>
        `
        sendMail(user.email, mailSubject, content);

        res.status(200).json({ message: `Ban for user ${user_id} has been deleted successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default unBanUser;
