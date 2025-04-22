// controller for login, signup
const ownerModel = require('../models/shopkeeperModel')
const userModel =  require('../models/authModel')
const { hashPassword, comparePassword } = require('../authHelper')
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const{ sendVerificationMail, sendPassResetMail } = require('./emailService')

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
        message: "User already exists with this email"
    })
  }

  // befor saving the data, hash the password
  const hashedPassword = await hashPassword(password)

// This userModel saves all user data (allusers)
//   save data in db
  const owner = await userModel({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role
  })

  // Generate and store the verification token
  owner.verificationToken = crypto.randomBytes(20).toString("hex");

  // Save the user to the database
  await owner.save();

  sendVerificationMail(email, owner.verificationToken);

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
    // const a = req.user
    // we can undefined password here to send user obj in response
    user.password = undefined;
    return res.status(200).send({
        success: true,
        message: "Login Successful",
        user,
        token,
        // a
      })
 
}


const resetController = async (req, res) => {
const email = req.body.email;

// const password = req.body.newPassword;

try {
        const userFound = await userModel.findOne({email})
      // console.log(email, password)
      // console.log(userFound)
      if(!userFound){
        res.status(404).send({
          success: false,
          message: "User doesn't found"
        })
      }
      // if user found in db then start pass reset process by sending link to pass reset api on registered email address of user
      const d = await sendPassResetMail(email);
      return res.send(d)


} catch (error) {
  return res.send({
    success: false,
    message: "server error",
    errorm :error.message 
  })
}
}


const handleNewPassController = async (req, res) => {
  // i/p form user
const recievedOTP = req.body.OTP;
const newPassword = req.body.newPassword;

// i/p form context config from frontend // pass this data obj form frontend
const email = req.body.email

const hashedPassword = await hashPassword(newPassword);

 const updatedUser = await userModel.findOneAndUpdate(
        { email : email },
        { password: hashedPassword },
        { new: true }
      );
return res.status(200).send({
  success: true,
  message : "password updated",
  updatedUser
})
}

module.exports = { registerController, loginController, resetController, handleNewPassController }