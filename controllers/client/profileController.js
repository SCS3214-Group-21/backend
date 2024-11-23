import Client from '../../models/client.js';

const createClient = async (req, res) => {
    try {
        const { bride_name, groom_name, location, wedding_date, budget, guest_count } = req.body;

        if (!bride_name || !groom_name || !location) {
            return res.status(400).json({ message: 'Missing required fields: bride_name, groom_name, or location' });
        }

        const pic = req.file ? `uploads/client/profilepics/${req.file.filename}` : null;

        // Check if a profile already exists for the user
        const existingClient = await Client.findOne({ where: { id: req.user.id } });

        if (existingClient) {
            // Update the existing profile
            existingClient.bride_name = bride_name;
            existingClient.groom_name = groom_name;
            existingClient.location = location;
            existingClient.wedding_date = wedding_date;
            existingClient.budget = budget;
            existingClient.guest_count = guest_count;

            if (pic) {
                existingClient.pic = pic; // Update the profile picture if provided
            }

            await existingClient.save();

            return res.status(200).json({
                message: 'Client profile updated successfully',
                client: existingClient,
            });
        }

        // Create a new profile if one does not exist
        const newClient = await Client.create({
            id: req.user.id,
            bride_name,
            groom_name,
            location,
            wedding_date,
            budget,
            guest_count,
            pic,
        });

        return res.status(201).json({
            message: 'Client profile created successfully',
            client: newClient,
        });
    } catch (error) {
        console.error('Error creating/updating client:', error);
        return res.status(500).json({
            message: 'Error creating/updating client',
            error: error.message,
        });
    }
};


export default createClient;

