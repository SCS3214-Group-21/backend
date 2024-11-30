import Quotation from "../../models/quotation.js";

const getClientQuotations = async (req, res) => {
    try {
        const client_id = req.user.id; // Assuming `req.user` contains the authenticated user
        const quotations = await Quotation.findAll({ where: { client_id } });

        res.status(200).json({ success: true, data: quotations });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching client quotations', error: error.message });
    }
};

export default getClientQuotations;
