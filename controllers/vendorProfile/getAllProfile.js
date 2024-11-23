import Vendor from "../../models/vendor.js";

const getAllProfile = async (req, res) => {
    try {
        const userProfiles = await Vendor.findAll()
        
        if(!userProfiles.length){
            return res.status(404).json({ message: 'No Vendors' });
        }
        res.status(200).json({
            message: 'Vendor retrived successfully',
            userProfiles
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving vendors',
            error: error.message
        })
    }
}

export default getAllProfile;