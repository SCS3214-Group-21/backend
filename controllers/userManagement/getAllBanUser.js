import BanUsers from "../../models/banusers.js";

// Get All Banned Users
const getAllBanUser = async (req, res) => {
    try {
        // Fetch all banned users
        const bannedUsers = await BanUsers.findAll();

        // Always return a data array
        res.status(200).json({ data: bannedUsers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default getAllBanUser;
