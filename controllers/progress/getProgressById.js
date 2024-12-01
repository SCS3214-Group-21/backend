import Progress from "../../models/progress.js";

const getProgressById = async (req, res) => {
    try {
        const { plan_id } = req.params; // Plan ID from request params
        const clientId = req.user.id; // Client ID from authenticated user

        // Find the progress entry for the given plan and client
        const progressEntry = await Progress.findOne({ where: { plan_id, client_id: clientId } });

        if (!progressEntry) {
            return res.status(404).json({ message: "Progress entry not found." });
        }

        // Filter out fields with values < 0
        const filteredProgress = Object.fromEntries(
            Object.entries(progressEntry.toJSON()).filter(([key, value]) => value >= 0)
        );

        res.status(200).json({
            message: "Progress retrieved successfully.",
            progress: filteredProgress,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve progress.",
            error: error.message,
        });
    }
};

export default getProgressById;
