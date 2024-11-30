import WeddingPlan from "../../models/weddingplan.js";
import Package from "../../models/package.js";
// Controller function to get budget by plan_id
const getBudgetById = async (req, res) => {
    const { id } = req.params;  // Get the plan_id from the request parameters

    try {
        // Step 1: Find the wedding plan by the provided plan_id
        const weddingPlan = await WeddingPlan.findByPk(id);

        // If the wedding plan doesn't exist
        if (!weddingPlan) {
            return res.status(404).json({ message: "Wedding plan not found." });
        }

        // Step 2: Gather the package IDs from the wedding plan columns
        const packageIds = [
            weddingPlan.hotels,
            weddingPlan.dressers,
            weddingPlan.photography,
            weddingPlan.floral,
            weddingPlan.jewellary,
            weddingPlan.dancing_groups,
            weddingPlan.ashtaka,
            weddingPlan.salons,
            weddingPlan.dJs,
            weddingPlan.honeymoon,
            weddingPlan.cars,
            weddingPlan.invitation_cards,
            weddingPlan.poruwa,
            weddingPlan.catering
        ];

        // Remove any null values from the packageIds array
        const validPackageIds = packageIds.filter(id => id !== null);

        // Step 3: Fetch the corresponding packages based on the package IDs
        const packages = await Package.findAll({
            where: {
                package_id: validPackageIds
            }
        });

        // Step 4: Return the package details
        return res.status(200).json({ packages });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export default getBudgetById;
