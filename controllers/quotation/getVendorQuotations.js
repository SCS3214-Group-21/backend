import Quotation from "../../models/quotation.js";
import Package from "../../models/package.js";

const getVendorQuotations = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not authenticated' });
        }

        const vendor_id = req.user.id;
        console.log('Fetching quotations for vendor ID:', vendor_id);

        const quotations = await Quotation.findAll({
            where: { vendor_id },
            include: [
                {
                    model: Package,
                    attributes: ['name'], // Fetch only the package name
                },
            ],
        });

        if (!quotations || quotations.length === 0) {
            return res.status(404).json({ success: false, message: 'No quotations found for this vendor' });
        }

        // Map the response to include package name and parse items as an array
        const mappedQuotations = quotations.map((quotation) => ({
            quotation_id: quotation.quotation_id,
            client_id: quotation.client_id,
            package_name: quotation.Package?.name || null, // Handle case where package is null
            items: JSON.parse(quotation.items || '[]'), // Parse items into a proper array
            details: quotation.details,
            status: quotation.status,
            price: quotation.price,
        }));

        res.status(200).json({ success: true, data: mappedQuotations });
    } catch (error) {
        console.error('Error fetching vendor quotations:', error.message);
        res.status(500).json({ success: false, message: 'Error fetching vendor quotations', error: error.message });
    }
};

export default getVendorQuotations;
