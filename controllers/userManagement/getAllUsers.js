import User from '../../models/user.js';

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'email', 'role', 'is_admin', 'is_verified', 'last_log', 'created_at', 'updated_at'],
        });
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message,
        });
    }
};

export default getAllUsers;