import User from '../../models/user.js';

const getUsersById = async (req, res) => {
    try {
        const userId = req.params.id;

        // Fetch the user by ID
        const user = await User.findOne({
            where: { id: userId },
            attributes: ['id', 'email', 'role', 'is_admin', 'is_verified', 'last_log', 'created_at', 'updated_at'],
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: user,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: error.message,
        });
    }
};

export default getUsersById;