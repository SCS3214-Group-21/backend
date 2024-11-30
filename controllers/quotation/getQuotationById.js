import Quotation from "../../models/quotation.js";

const getQuotationById = async (req, res) => {
    try {
        const { quotationId } = req.params;
        const quotation = await Quotation.findByPk(quotationId);

        if (!quotation) {
            return res.status(404).json({ success: false, message: 'Quotation not found' });
        }

        res.status(200).json({ success: true, data: quotation });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching quotation', error: error.message });
    }
};

export default getQuotationById;
