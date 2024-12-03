// import Quotation from "../../models/quotation.js";

// const getClientQuotations = async (req, res) => {
//     try {
//         const client_id = req.user.id; // Assuming `req.user` contains the authenticated user
//         const quotations = await Quotation.findAll({ where: { client_id } });

//         res.status(200).json({ success: true, data: quotations });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Error fetching client quotations', error: error.message });
//     }
// };

// export default getClientQuotations;

import Quotation from "../../models/quotation.js";
import Package from "../../models/package.js";

const getClientQuotations = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not authenticated' });
        }

        const client_id = req.user.id;
        console.log('Fetching quotations for client ID:', client_id);

        // Fetch quotations for the client along with the package name
        const quotations = await Quotation.findAll({
            where: { client_id },
            include: [
                {
                    model: Package,
                    attributes: ['name'], // Fetch only the package name
                },
            ],
        });

        if (!quotations || quotations.length === 0) {
            return res.status(404).json({ success: false, message: 'No quotations found for this client' });
        }

        // Map the response to include package name and parse items as an array
        const mappedQuotations = quotations.map((quotation) => ({
            quotation_id: quotation.quotation_id,
            package_name: quotation.Package?.name || null, // Handle case where package is null
            items: JSON.parse(quotation.items || '[]'), // Parse items into a proper array
            details: quotation.details,
            status: quotation.status,
            price: quotation.price,
        }));

        res.status(200).json({ success: true, data: mappedQuotations });
    } catch (error) {
        console.error('Error fetching client quotations:', error.message);
        res.status(500).json({ success: false, message: 'Error fetching client quotations', error: error.message });
    }
};

export default getClientQuotations;

