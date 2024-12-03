import User from '../../models/user.js';

const getUserEmail = async (req, res) => {
    try {
      
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Fetch user email
        const user = await User.findOne({
            where: { id: userId },
            attributes: ["email"], // Fetch only email
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User email retrieved successfully",
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user email",
            error: error.message,
        });
    }
};

export default getUserEmail;
