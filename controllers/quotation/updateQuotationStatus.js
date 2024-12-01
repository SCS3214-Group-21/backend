import Quotation from "../../models/quotation.js";

const updateQuotationStatus = async (req, res) => {
    try {
        const { quotationId } = req.params;
        const { status,price } = req.body;

        const quotation = await Quotation.findByPk(quotationId);
        if (!quotation) {
            return res.status(404).json({ success: false, message: 'Quotation not found' });
        }

        quotation.status = status;
        quotation.price = price;
        await quotation.save();

        res.status(200).json({ success: true, message: 'Quotation status and price updated', data: quotation });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating quotation status and price', error: error.message });
    }
};

export default updateQuotationStatus;
