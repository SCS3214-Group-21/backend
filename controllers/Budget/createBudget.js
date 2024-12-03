import WeddingPlan from "../../models/weddingplan.js";

const createBudget = async (req, res) => {
  try {
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

    const newBudget = await WeddingPlan.create({
      client_id: req.user.id,
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

    // creating a notification
    await Notification.create({
      title: `New Budget Created`,
      description: ``,
      priority: 'low',
      viewed: false,
      user_id: req.user.id,
    })

    res.status(201).json({
      message: "Budget created successfully",
      budget: newBudget,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating budget",
      error: error.message,
    });
  }
};

export default createBudget;
