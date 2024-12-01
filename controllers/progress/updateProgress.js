import Progress from "../../models/progress.js";

const updateProgress = async (req, res) => {
    try {
        const { plan_id } = req.params; // Plan ID from request params
        const clientId = req.user.id; // Client ID from authenticated user
        const { field, value } = req.body; // Field to update and its new value (e.g., { field: "hotels", value: 1 })

        // Validate input
        if (!field || typeof value !== "number") {
            return res.status(400).json({ message: "Invalid input. Field and value are required." });
        }

        // Find the progress entry for the given plan and client
        const progressEntry = await Progress.findOne({ where: { plan_id, client_id: clientId } });

        if (!progressEntry) {
            return res.status(404).json({ message: "Progress entry not found." });
        }

        // Update the specified field
        if (!(field in progressEntry)) {
            return res.status(400).json({ message: `Field '${field}' is not valid.` });
        }

        progressEntry[field] = value;

        // Calculate progress
        const progressFields = Object.entries(progressEntry.toJSON())
            .filter(([key]) => !["progress_id", "plan_id", "client_id", "progress"].includes(key)); // Exclude non-progress fields

        const nonNegativeCount = progressFields.filter(([_, val]) => val >= 0).length; // Total count of non-negative fields
        const positiveCount = progressFields.filter(([_, val]) => val > 0).length; // Count of positive values

        const progress = (positiveCount / nonNegativeCount) * 100;
        progressEntry.progress = parseFloat(progress.toFixed(2)); // Round to 2 decimal places

        // Save the updated progress entry
        await progressEntry.save();

        res.status(200).json({
            message: "Progress updated successfully.",
            progress: progressEntry,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update progress.",
            error: error.message,
        });
    }
};

export default updateProgress;
