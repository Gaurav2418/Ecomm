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
            type: String,
            required: true,
            default: false
        },
        
    }
)



module.exports = mongoose.model("shopowner", ownerSchema)