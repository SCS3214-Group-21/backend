import Package from "../../models/package.js";

// Function to create a new package
const createPackage = async (req, res) => {
    try {
        const { name, amount, items, description } = req.body;

        // Ensure required fields are provided
        if (!name || !amount || !items || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Ensure a file is provided
        // if (!req.file) {
        //     return res.status(400).json({ message: 'Image file is required' });
        // }

        // Parse items as JSON if it's provided as a JSON string
        let parsedItems;
        try {
            parsedItems = JSON.parse(items);
        } catch (error) {
            return res.status(400).json({ message: 'Items must be a valid JSON object' });
        }

        // Create the new package
        const newPackage = await Package.create({
            vendor_id: req.user.id, // Assuming the authenticated user's ID is attached to the request
            name,
            img: `images/${req.file.filename}`, // Correctly handle file upload path
            amount,
            items: parsedItems,
            description,
            is_enable: true, // Set default enabled status if required
        });

        // Send the response
        res.status(201).json({
            message: 'Package created successfully',
            package: newPackage,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating package',
            error: error.message,
        });
    }
};

export default createPackage;
