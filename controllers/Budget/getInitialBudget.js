import WeddingPlan from "../../models/weddingplan.js";
import Package from "../../models/package.js";
import User from "../../models/user.js";
import Vendor from "../../models/vendor.js";
import Client from "../../models/client.js";
// import sequelize from "../../config/dbConn.js";
import { Op } from "sequelize";

const getInitialBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const client_id = req.user.id

        // Fetch the budget and client details
        const budgetDetails = await WeddingPlan.findOne({ where: { plan_id: id } });
        if (!budgetDetails) {
            return res.status(404).json({ message: "Budget Not Found" });
        }

        // Get client location
        const clientDetails = await Client.findOne({ where: { id: client_id } });
        const clientLocation = clientDetails.location;

        // Extract the budget amounts for different services
        const servicesBudget = {
            hotels: budgetDetails.hotels,
            dressers: budgetDetails.dressers,
            photography: budgetDetails.photography,
            floral: budgetDetails.floral,
            jewellary: budgetDetails.jewellary,
            dancing_groups: budgetDetails.dancing_groups,
            ashtaka: budgetDetails.ashtaka,
            salons: budgetDetails.salons,
            dJs: budgetDetails.dJs,
            honeymoon: budgetDetails.honeymoon,
            cars: budgetDetails.cars,
            invitation_cards: budgetDetails.invitation_cards,
            poruwa: budgetDetails.poruwa,
            catering: budgetDetails.catering,
        };

        const suggestions = {};

        // Iterate through each service
        for (const [service, budget] of Object.entries(servicesBudget)) {
            if (budget !== null && budget > 0) {
                console.log(`Processing service: ${service}, Budget: ${budget}`);

                // Fetch all packages matching the service category
                const packages = await Package.findAll({
                    include: [
                        {
                            model: User,
                            attributes: [], // Exclude User details
                            where: { role: service },
                        },
                        {
                            model: Vendor,
                            attributes: ["city", "branch"], // Include vendor location details
                            where: { role: service },
                        },
                    ],
                    where: {
                        amount: { [Op.lte]: budget }, // Within budget
                        is_enable: true, // Only enabled packages
                    },
                });
                
                console.log(`Found ${packages.length} packages for service: ${service}`);
                

                // Filter and prioritize packages by location
                const locationBasedPackages = packages.filter(pkg => {
                    const vendorCity = pkg.Vendor.city;
                    const vendorBranches = JSON.parse(pkg.Vendor.branch || "[]");

                    // Check if the vendor's city or branches match the client's location
                    return (
                        vendorCity === clientLocation ||
                        vendorBranches.includes(clientLocation)
                    );
                });

                // If location-based packages exist, prioritize the most expensive package
                const selectedPackage =
                    locationBasedPackages.length > 0
                        ? locationBasedPackages.sort((a, b) => b.amount - a.amount)[0] // Select the most expensive location-matching package
                        : packages.sort((a, b) => b.amount - a.amount)[0]; // Fallback: Select the most expensive package

                suggestions[service] = selectedPackage || null;
            } else {
                suggestions[service] = null; // No budget allocated
            }
        }

        // Respond with the budget details and package suggestions
        res.status(200).json({
            message: "Budget and package suggestions retrieved successfully",
            budgetDetails,
            suggestions,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving budget and suggestions",
            error: error.message,
        });
    }
};

export default getInitialBudget;
