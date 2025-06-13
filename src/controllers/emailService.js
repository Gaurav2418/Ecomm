const nodemailer = require("nodemailer");
const { hashPassword } = require("../authHelper");
const userModel =  require('../models/authModel')

// function to send verificatio mail function
const sendVerificationMail = async (email, verificationToken) => {
    
  //  creating nodemailer transporter
    const transporter = nodemailer.createTransport({
      // 1st configure email service
      service:"gmail",
      auth: {
        user: "teamnstofficial@gmail.com",
        pass: process.env.mail_passkey
      }
    });

    // compose email msg
    // const mailOptions = { 
    //   from:"TeamNST.com",
    //   to: email,
    //   subject: "Email Verification",
    //   text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`
    // }

    const mailOptions = {
      from: '"Team NST" <no-reply@teamnst.com>', // More professional sender
      to: email,
      subject: "Verify Your Email Address",

      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Welcome to Team NST!</h2>
          <p>Hi there,</p>
          <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
          <a href="https://ecomm-153c.onrender.com/api/verify/${verificationToken}" 
             style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">
             Verify Email
          </a>
          <p>If you did not sign up for this account, you can ignore this email.</p>
          <br>
          <p>Best regards,<br>Team NST</p>
        </div>
      `
    };
  
    // send Email
    try {
      await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
};



const sendPassResetMail = async ( email ) => {
    // plain text pass hashed here
    // const hashedPassword = await hashPassword(password)
console.log(email)
    // generate OTP
    const a = Math.random()*1000000;
    const otp = Math.floor(a)
console.log(otp)
    const updatedUser = await userModel.findOneAndUpdate(
        { email : email },
        { PROTP: otp },
        { new: true }
      );    
console.log(updatedUser);

    //  creating nodemailer transporter
      const transporter = nodemailer.createTransport({
        // 1st configure email service
        service:"gmail",
        auth: {
          user: "teamnstofficial@gmail.com",
          pass: process.env.mail_passkey
        }
      });

      const mailOptions = {
        from: '"Team NST" <no-reply@teamnst.com>', // More professional sender
        to: email,
        subject: "Password Reset",
  
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Welcome to Team NST!</h2>
            <p>Hi there,</p>
            <p>Reset your password by using this otp</p>
            
            <p>This is your One Time Password  ${otp} ,Please Do Not Share it with anyone.  </p>
            <br>
            <p>Best regards,<br>Team NST</p>
          </div>
        `
      };
    
      // send Email
      try {
        await transporter.sendMail(mailOptions);
        console.log("Reset Pssword mail sent successfully");
        return updatedUser ;
      } catch (error) {
        console.error("Error sending Reset Pssword email:", error);
      }
  };
  
module.exports = { sendVerificationMail, sendPassResetMail };