import Quotation from "../../models/quotation.js";

const addQuotation = async (req, res) => {
    try {
        const { client_id, vendor_id, items, details, package_id } = req.body;

        const newQuotation = await Quotation.create({
            client_id,
            vendor_id,
            items: JSON.stringify(items),
            details,
            package_id,
            
        });

        res.status(201).json({ success: true, message: 'Quotation created successfully', data: newQuotation });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating quotation', error: error.message });
    }
};

export default addQuotation;
