import Client from '../../models/client.js';

const getClient = async (req, res) => {
    try {
        
        const client = await Client.findOne({
            where: { id: req.user.id },
        });
        console.log(client);

        if (!client) {
            console.log("no profile")
            return res.status(200).json({ client: null }); // No profile exists
        }


        res.status(200).json({ client });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching client profile', error: error.message });
    }
};

export default getClient;

