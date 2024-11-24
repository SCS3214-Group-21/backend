import Package from "../../models/package.js";
import User from "../../models/user.js";
import { Sequelize } from "sequelize";

const getMinPackages = async (req, res) => {
    try {
        // Query for minimum package price grouped by role
        const minPackages = await Package.findAll({
            attributes: [
                [Sequelize.col("user.role"), "role"], // Select the role from the User model
                [Sequelize.fn("MIN", Sequelize.col("amount")), "min_price"], // Minimum package price
            ],
            include: [
                {
                    model: User,
                    attributes: [], // Exclude other User attributes
                },
            ],
            where: {
                is_enable: true, // Filter for enabled packages
            },
            group: ["user.role"], // Group by user role
            raw: true, // Get raw query results
        });

        // Check if data is found
        if (!minPackages.length) {
            return res.status(404).json({ message: "No packages found." });
        }

        // Return the results
        res.status(200).json({
            message: "Minimum packages retrieved successfully.",
            minPackages,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving minimum packages.",
            error: error.message,
        });
    }
};

export default getMinPackages;
