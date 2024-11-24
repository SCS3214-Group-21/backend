import WeddingPlan from "../../models/weddingplan.js";

const updateBudget = async (req, res) => {
  try {
    const { plan_id } = req.params; // The ID of the budget to update
    const {
      hotels,
      dressers,
      photography,
      floral,
      jewellary,
      dancing_groups,
      ashtaka,
      salons,
      dJs,
      honeymoon,
      cars,
      invitation_cards,
      poruwa,
      catering,
    } = req.body;

    // Find the budget by plan_id and ensure it belongs to the authenticated user
    const budget = await WeddingPlan.findOne({
      where: {
        plan_id,
        client_id: req.user.id, // Ensures the budget belongs to the logged-in user
      },
    });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found or not authorized" });
    }

    // Update the budget with the provided data
    const updatedBudget = await budget.update({
      hotels,
      dressers,
      photography,
      floral,
      jewellary,
      dancing_groups,
      ashtaka,
      salons,
      dJs,
      honeymoon,
      cars,
      invitation_cards,
      poruwa,
      catering,
    });

    res.status(200).json({
      message: "Budget updated successfully",
      budget: updatedBudget,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating budget",
      error: error.message,
    });
  }
};

export default updateBudget;