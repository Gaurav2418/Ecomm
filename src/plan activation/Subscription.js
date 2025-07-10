const e = require("express");
const ownerModel = require("../models/shopkeeperModel");


const activatePlanController = async (req, res) => {
const { name, price, validityDays, activatedDate, shopOwnerDocumentID } = req.body;

try {
    const responseData = await ownerModel.findByIdAndUpdate(
        {_id: shopOwnerDocumentID },
        {
            subscription_status: true,
            currentPlan: {
                name,
                price,
                validityDays,
                activatedAt: Date.now(),
            }
        },
        {new: true}
    )

    res.status(200).send({
        success: true,
        message: "Plan activated successfully",
        data: responseData
    })

} catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Plan activation failed, error in activePlanController",
        error: error.message
    })
}

}


// Middleware to check plan validity
// This middleware checks if the user's plan is still valid before allowing access to certain routes
const checkPlanValidityController = async (req, res, next) => {
    const { shopProfile } = req.body;
  
    try {
      const ownerData = await ownerModel.findById(shopProfile);
  
      if (!ownerData) {
        return res.status(404).send({
          success: false,
          message: "Shop owner not found",
        });
      }
  
      const currentPlan = ownerData.currentPlan;
  
      if (!currentPlan || !currentPlan.name) {
        return res.status(400).send({
          success: false,
          message: "No active plan found",
        });
      }
  
      const currentDate = new Date();
      const activatedAt = new Date(currentPlan.activatedAt);

        const expiresAt = new Date(activatedAt); // Create a new date object for expiration
        
        // Calculate expiry date by adding validityDays to activatedAt
       expiresAt.setDate(expiresAt.getDate()+ currentPlan.validityDays);
       if (currentDate > expiresAt) {
        return res.status(400).send({
          success: false,
          message: "Your plan has been expired, please renew your plan",
        });
      }
  
      //  res.status(200).send({
      //   success: true,
      //   message: "Your plan is still valid",
      //   data: currentPlan,
      // });
      // next will be called only if a valid plan/ active subscription found in db
      next();

    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error checking plan validity",
        error: error.message,
      });
    }
  };


module.exports = { activatePlanController, checkPlanValidityController }