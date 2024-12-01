// import Quotation from "../../models/quotation.js";

// const getVendorQuotations = async (req, res) => {
//     try {
//         const vendor_id = req.user.id; // Assuming `req.user` contains the authenticated vendor
//         console.log("vendorId", vendor_id)
        
//         const quotations = await Quotation.findAll({ where: { vendor_id } });

//         res.status(200).json({ success: true, data: quotations });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Error fetching vendor quotations', error: error.message });
//     }
// };

// export default getVendorQuotations;


import Quotation from "../../models/quotation.js";

const getVendorQuotations = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not authenticated' });
        }

        const vendor_id = req.user.id;
        console.log('Fetching quotations for vendor ID:', vendor_id);

        const quotations = await Quotation.findAll({ where: { vendor_id } });

        if (quotations.length === 0) {
            return res.status(404).json({ success: false, message: 'No quotations found for this vendor' });
        }

        res.status(200).json({ success: true, data: quotations });
    } catch (error) {
        console.error('Error fetching vendor quotations:', error.message);
        res.status(500).json({ success: false, message: 'Error fetching vendor quotations', error: error.message });
    }
};

export default getVendorQuotations;

