const express = require('express');
const router = express.Router();
const { createOrderController } = require('../payments/razorpayController.js');
const crypto = require('crypto');
const { RAZORPAY_KEY_ID, RAZORPAY_SECRET } = process.env;

 router.post('/create-order', createOrderController)

router.post('/verify-payment', (req, res) => {
    const { paymentData, planData  } = req.body;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentData;
    const { name, price, validityDays, shopOwnerDocumentID } = planData;
  
    const generatedSignature = crypto
      .createHmac('sha256', RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');
  
    if (generatedSignature === razorpay_signature) {
      // ✅ Signature verified
      // You can now mark payment as successful in your DB
      // Example: activate subscription, update user, log payment, etc.

      try {
          const responseData = await ownerModel.findByIdAndUpdate(
               shopOwnerDocumentID,
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
      
          return res.status(200).send({
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

      // return res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      // ❌ Signature does not match – possible tampering
      return res.status(400).json({ error: 'Payment verification failed' });
    }
  });

  module.exports = router;
