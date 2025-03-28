const mongoose = require('mongoose')

const saleSchema = mongoose.Schema({
    userDetails: {
        type: mongoose.Schema.ObjectId,
        ref: "alluser",
        required: true,
            },

    category: {
        type: String,
        },

    brands: {
        type: String
    }
})

module.exports = mongoose.model('sale', saleSchema)