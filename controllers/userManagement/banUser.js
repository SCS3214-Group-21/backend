import BanUsers from '../../models/banusers.js'; // Import your BanUsers model
import User from '../../models/user.js'; // Import your User model

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

        return res.status(200).json({ success: true, message: 'User banned successfully', data: ban });
    } catch (error) {
        console.error('Error banning user:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export default banUser;