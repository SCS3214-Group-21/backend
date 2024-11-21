import Client from '../../models/client.js';

const createClient = async (req, res) => {
    try {
        const { bride_name, groom_name, location, wedding_date, budget, guest_count } = req.body;

        // Ensure required fields are provided
        if (!bride_name || !groom_name || !location) {
            return res.status(400).json({ message: 'Missing required fields: bride_name, groom_name, or location' });
        }

        // If a file is uploaded, get the file path
        const pic = req.file ? `uploads/client/profilepics/${req.file.filename}` : null;

        // Create the new client entry
        const newClient = await Client.create({
            id: req.user.id, // Assuming the authenticated user's ID is attached to the request
            bride_name,
            groom_name,
            location,
            wedding_date,
            budget,
            guest_count,
            pic,
        });

        res.status(201).json({
            message: 'Client profile created successfully',
            client: newClient,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating client',
            error: error.message,
        });
    }
};

export default createClient;
