const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema(
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
        }
    }
)



module.exports = mongoose.model("shopowner", ownerSchema)