const shopkeeperModel = require("../models/shopkeeperModel")
const allUserModel = require("../models/authModel")
const saleModel = require("../models/saleModel")


const paymentController = (req, res) => {

}


const saleController = async (req, res) => {
const {brands, category, product} = req.body

if(!brands && !category){
    return res.status(400).send("To post a sale you must enter Brands or category")
}

const data = await saleModel({
    userDetails:req.user.id,
    brands,
    product,
    category
}).save()
 // Find the newly created sale document
console.log(data._id)
 const populatedData = await saleModel.findById(data._id).populate('userDetails',"email role")


return res.status(200).send({
    message:"sale has been created with following data",
    populatedData
})
}


const getProfileController = async (req, res) => {
console.log(req.user)
const owner = await allUserModel.findOne({_id: req.user.id})                    // data from alluser collection (i.e. auth data name, email, role)
const profData = await shopkeeperModel.findOne({email: req.user.email})         // data from shopowner collection

// we can access here both alluser, shopowner collections from db
console.log(profData)
console.log(owner)
return res.status(200).send(owner)
}


const createProfileController = async (req, res) => {
    console.log(req)
    // searching for user data in alluser model using id coming from req data 
    const owner = await allUserModel.findOne({_id: req.user.id})
    console.log(owner)

    const shopkeeperDocumentId = owner._id 
    req.user = shopkeeperDocumentId

    const shoplocation = "nagar"
    // Creating profile and saving in db
    const data = await shopkeeperModel({
        userDetails: owner._id,
        shopLocation:shoplocation
    }).save()
    return res.status(200).send(data)
    }
    




module.exports = { paymentController, saleController, getProfileController, createProfileController}