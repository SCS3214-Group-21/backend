import Client from '../../models/client.js'; // Adjust path as necessary
import Vendor from '../../models/vendor.js';

const getUserByIdRole = async (req, res) => {
    const { userId, role } = req.body;

    try {
        if (!userId || !role) {
            return res.status(400).json({ message: 'User ID and role are required.' });
        }

        let details;

        if (role === 'client') {
            details = await Client.findOne({
                where: { id: userId },
            });

            if (!details) {
                return res.status(404).json({ message: 'Client details not found.' });
            }
        } else {
            details = await Vendor.findOne({
                where: { id: userId },
            });

            if (!details) {
                return res.status(404).json({ message: 'Vendor details not found.' });
            }
        } 
        // else {
        //     return res.status(400).json({ message: 'Invalid role. Role must be either "client" or "vendor".' });
        // }

        return res.status(200).json({ message: 'Details fetched successfully.', data: details });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export default getUserByIdRole;