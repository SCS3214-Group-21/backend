import Package from "../../models/package.js";

// Function to toggle the `is_enable` status of a specific package by its ID
const updatePackageStatus = async (req, res) => {
    try {
        const { packageId } = req.params;
        const userId = req.user.id; // ID of the logged-in user

        // Fetch the package from the database
        const packageItem = await Package.findOne({ where: { package_id: packageId } });

        // Check if the package exists
        if (!packageItem) {
            return res.status(404).json({ message: 'Package not found' });
        }

        // Check if the logged-in user is the owner of the package
        if (packageItem.vendor_id !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this package' });
        }

        // Toggle the `is_enable` field
        const updatedIsEnable = !packageItem.is_enable;

        // Update the package with the toggled `is_enable` value
        const [affectedRows, updatedPackages] = await Package.update(
            { is_enable: updatedIsEnable },
            {
                where: { package_id: packageId },
                returning: true, // Return the updated package
            }
        );

        // Check if the update was successful
        if (affectedRows === 0) {
            return res.status(400).json({ message: 'Package enable status toggle failed' });
        }

        // creating a notification
        await Notification.create({
            title: `Package ${packageItem.name} is ${packageItem.is_enable}`,
            description: `Package has been ${packageItem.is_enable ? "enabled" : "disabled"}`,
            priority: 'normal',
            viewed: false,
            user_id: req.user.id,
        })

        res.status(200).json({
            message: 'Package enable status toggled successfully',
            package: updatedPackages[0], // Get the updated package from the response
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error toggling package enable status',
            error: error.message,
        });
    }
};

export default updatePackageStatus;
