// controller for login, signup
const ownerModel = require('../models/shopkeeperModel')
const userModel =  require('../models/authModel')
const {hashPassword, comparePassword } = require('../authHelper')
const jwt = require("jsonwebtoken")

const registerController = async (req, res) => {

try{
// req data validation
const {name, email, password, role} = req.body;
if(!name){
    return res.status(400).send({
      success: false,
      message: "Name is required"
    })
  }
  if(!email){
    return res.status(400).send({
      success: false,
      message: "Email is required"
    })
  }
  if(!password){
    return res.status(400).send({
      success: false,
      message: "Password is required"
    })
  }
  if(!role){
    return res.status(400).send({
      success: false,
      message: "Role is required"
    })
  }

//   check if user alraeady exist
const existingUser = await userModel.findOne({email});
  if( existingUser ){
    return res.status(409).send({
        success: false,
        message: "User already exists with thil email"
    })
  }

  // befor saving the data, hash the password
  const hashedPassword = await hashPassword(password)

// This userModel saves all user data (allusers)
//   save data in db
  const owner = await userModel({
    name,
    email,
    password: hashedPassword,
    role
  }).save()

  return res.status(200).send({
    success: true,
    message:"data saved to db"
  })
}catch(error){
    console.log(error);
}
}


const loginController = async (req, res) => {

    const { email, password} = req.body;

  if(!email){
    return res.status(400).send({
      success: false,
      message: "Email is required"
    })
  }
  if(!password){
    return res.status(400).send({
      success: false,
      message: "Password is required"
    })
  }

  const user = await userModel.findOne({email})

  if(!user){
    return res.status(404).send({
        success: false,
        message: "User not found"
    })
  }

  // if user found compare pass
  
    const isMatch = await comparePassword(password, user.password)

    if(!isMatch){
      return res.status(400).send("Please enter correct username and password")
    }

    // if pass match
    const token = jwt.sign({id: user._id, role:user.role },  process.env.jwt_secret)
 
    return res.status(200).send({
        success: true,
        message: "Login Successful",
        user,
        token
      })
 
}

module.exports = { registerController, loginController }