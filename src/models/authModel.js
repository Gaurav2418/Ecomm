// This schema will save all the common data of both user and shopkeeper while signup

const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            set: (v) => v.toLowerCase()
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "shopkeeper"],
            required: true,
            
        }
    },
    {
        timestamps: true
    }
)



module.exports = mongoose.model("alluser", userSchema)