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
    createdAt: {
        type: Date,
        default: Date.now,
      },
    
      // TTL deletion field
      expireAt: {
        type: Date,
        required: true,
      },
})
// TTL index: auto-delete after "expireAt" time is reached
saleSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('sale', saleSchema)