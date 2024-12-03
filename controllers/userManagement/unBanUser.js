import BanUsers from '../../models/banusers.js';// Assuming the BanUsers model is in the 'models' folder

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

        res.status(200).json({ message: `Ban for user ${user_id} has been deleted successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default unBanUser;
