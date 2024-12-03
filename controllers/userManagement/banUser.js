import BanUsers from '../../models/banusers.js'; // Import your BanUsers model
import User from '../../models/user.js'; // Import your User model
import sendMail from '../../middlewares/sendMail.js';

// Controller to ban a user
const banUser = async (req, res) => {
    const { userId, reason } = req.body;

    try {
        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }


        // Create the ban record in the BanUsers table
        const ban = await BanUsers.create({
            user_id: userId,
            reason: reason,
            // answer: 'Banned', // Optional: You can use an answer or leave it as needed
        });

        // console.log("Email: ", user.email);
        const mailSubject = 'Your Account Has Been Banned'
        const content = `
            <p>Dear Customer,</p>
            <p>We regret to inform you that your account has been banned due to the following reason:</p>
            <p><strong>${reason}</strong></p>
            <p>If you believe this action was taken in error or if you wish to appeal, please contact our support team at <a href="mailto:dreamwed@gmail.com">dreamwed@gmail.com</a>.</p>
            <p>Thank you for your understanding.</p>
            <p>Best regards,<br/>DreamWed Team</p>`
        sendMail(user.email, mailSubject, content);

        return res.status(200).json({ success: true, message: 'User banned successfully', data: ban });
    } catch (error) {
        console.error('Error banning user:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export default banUser;