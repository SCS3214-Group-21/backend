import WeddingPlan from "../../models/weddingplan.js";
import Package from "../../models/package.js";
import User from "../../models/user.js";
import sequelize from "../../config/dbConn.js";
import { Op } from "sequelize";

const Manageuser = async (req, res) => {
 
 
 
 
 
 
 
 
 
 
    try {
 
 
 
        const { id } = req.params;

        // Fetch the budget details for the given plan ID
 
        const budgetDetails = await WeddingPlan.findOne({ where: { plan_id: id } });





        if (!budgetDetails) {
            return res.status(404).json({ message: "Budget Not Found" });
        }
















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


                
                // Fetch a package matching the service category and budget
                
                
                
                const packageSuggestion = await Package.findAll({
                
                
                
                
                
                
                    include: [
                
                
                
                
                
                
                
                        {
                
                
                
                
                
                            model: User,
                            attributes: [], // We don't need User details in the final result
                            where: { role: service }, // Match service with the User's role
                
                
                
                
                
                
                
                        },
                    ],
                
                
                
                
                
                    where: {
                
                
                
                        amount: { [Op.lte]: budget }, // Budget constraint
                        is_enable: true, // Only enabled packages
                    },
                
                    order: sequelize.literal("RAND()"), // Randomize the selection
                    limit: 1, // Get one package
                
                });

                
                
                // Add the suggestion to the response
                
                
                
                
                
                
                suggestions[service] =
                    packageSuggestion.length > 0 ? packageSuggestion[0] : null;
            
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
































export default Manageuser;
