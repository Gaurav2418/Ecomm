const shopkeeperModel = require("../models/shopkeeperModel")
const allUserModel = require("../models/authModel")
const saleModel = require("../models/saleModel")


const paymentController = (req, res) => {

}


const saleController = async (req, res) => {
const {brands, category, product, shopProfile, validityDays, description} = req.body
const now = new Date();
const expireAt = new Date(now.getTime() + validityDays * 24 * 60 * 60 * 1000); // add days in ms

if(!brands && !category){
    return res.status(400).send("To post a sale you must enter Brands or category")
}

const data = await saleModel({
    userDetails:req.user.id,
    shopProfile,
    brands,
    product,
    category,
    saleDescription: description,
    expireAt
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
const {email} = req.body;
const ownerGenericData = await allUserModel.findOne({_id: req.user.id}).select('-password')                    // data from alluser collection (i.e. auth data name, email, role)
const ownerProfData = await shopkeeperModel.findOne({userDetails:req.user.id})         // data from shopowner collection


// we can access here both alluser, shopowner collections from db
// console.log(ownerGenericData)
// console.log(ownerProfData)
return res.status(200).send({ownerProfData,ownerGenericData}) // sending the data of shopkeeper profile to frontend
}


const createProfileController = async (req, res) => {
    console.log(req)
    // searching for user data in alluser model using id coming from req data 
    const owner = await allUserModel.findOne({_id: req.user.id})
    console.log(owner)

    const shopkeeperDocumentId = owner._id 
    req.user = shopkeeperDocumentId

    const shoplocation = req.body.LocationLink;
    const address = req.body.address;
    const landmarks = req.body.landmarks;
    const email = req.body.email;
    const mobile = req.body.mobile;
    // const subscription_status = req.body.subscription_status;

    // check if the shopkeepers profile is already created or not
    const existingProfile = await shopkeeperModel.findOne({userDetails: owner._id});
    if (existingProfile) {
        existingProfile.address = address;
        existingProfile.landmarks = landmarks;
        existingProfile.shopLocation = shoplocation;
        existingProfile.mobile = mobile;

        existingProfile.save()
        return res.status(201).send({
            message:"Profile already exists, and updated with new data",
            existingProfile
        })
    }

    // Creating profile and saving in db
    const data = await shopkeeperModel({
        userDetails: owner._id,
        shopLocation:shoplocation,
        address,
        landmarks,
        mobile
    }).save()
    return res.status(200).send(data)
    }
    




module.exports = { paymentController, saleController, getProfileController, createProfileController}