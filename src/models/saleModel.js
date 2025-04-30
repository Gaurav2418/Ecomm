const mongoose = require('mongoose')

const saleSchema = mongoose.Schema({
    userDetails: {
        type: mongoose.Schema.ObjectId,
        ref: "alluser",
        required: true,
            },
    shopProfile: {
        type: mongoose.Schema.ObjectId,
        ref: "shopowner",
        required: true,
            },
    category: {
        type: String,
        },

    brands: {
        type: String
    },
    product: {
        type: String
    },
    saleDescription: {
        type: String
    },
    keyWords: {
        type: String
    },
})

module.exports = mongoose.model('sale', saleSchema)