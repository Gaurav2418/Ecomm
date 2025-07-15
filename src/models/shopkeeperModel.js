const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema(
    {
        userDetails: {
            type: mongoose.Schema.ObjectId,
            ref: "alluser",
            required: true,
          },
        saleDetails: {
            type: mongoose.Schema.ObjectId,
            ref: "sale",
          },
        shopLocation: {    
            type: String,
            required: true,
          },
        subscription_status: {
            type: Boolean,
            required: true,
            default: false
        },
        address: {
            type: String,
            required: true,
          },
          mobile:{
            type: String,
            required: true,
          },
        landmarks: {
            type: String,
            required: true,
          },
        currentPlan: {
          name: String,         // e.g., "Basic Plan"
          price: Number,        // e.g., 500
          validityDays: Number, // e.g., 30
          features: [String],   // e.g., ["Feature A", "Feature B"]
          activatedAt: Date
        },
    
        // Embedded Payments Array
        payments: [
          {
            paymentId: String,
            orderId: String,
            amount: Number,
            date: Date,
            planSnapshot: {
              name: String,
              price: Number,
              features: [String]
            }
          }
        ]
    },
    { timestamps: true }
)



module.exports = mongoose.model("shopowner", ownerSchema)