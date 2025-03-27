const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema(
    {
        userDetails: {
            type: mongoose.Schema.ObjectId,
            ref: "allUser",
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