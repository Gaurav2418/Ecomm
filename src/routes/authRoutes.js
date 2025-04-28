const express = require('express')
const router = express.Router()
const { registerController, loginController, resetController, handleNewPassController } = require('../controllers/auth')
const verifyToken = require('../../middlewares/verifyMiddleware')
const userModel =  require('../models/authModel')
const { sendVerificationMail } = require('../controllers/emailService')

router.get('/base', (req, res)=>{
    return res.send("hello user")
})

router.post('/register', registerController)
router.post('/login', loginController)

router.post('/verifyemail', async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email});
  const res = sendVerificationMail(email, user.verificationToken);
  console.log(res)
});


// route to verify email address
router.get('/verify/:token', async (req, res) => {
    try {
      const token = req.params.token;
  
      //Find the user witht the given verification token
      const user = await userModel.findOne({ verificationToken: token });
      if (!user) {
        return res.status(404).json({ message: "Invalid verification token" });
      }
  
      //Mark the user as verified
      user.verified = true;
      user.verificationToken = undefined;
  
      await user.save();
  
      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).json({ message: "Email Verificatioion Failed" });
    }
  })


//   route for password reset
router.post('/pass-reset', verifyToken, resetController);
router.post('/password', verifyToken, handleNewPassController)


module.exports = router;