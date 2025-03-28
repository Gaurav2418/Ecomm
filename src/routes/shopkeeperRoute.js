const express = require('express')
const router = express.Router()
const { registerController, loginController } = require('../controllers/auth')
const { paymentController, saleController, getProfileController, createProfileController } = require('../controllers/shopController')
const verifyToken = require('../../middlewares/verifyMiddleware')
const authorizeRoles = require('../../middlewares/roleMiddleware')

router.get('/base', (req, res)=>{
    return res.send("hello shopkeeper")
})

router.get('/profile', verifyToken, getProfileController)
// router.post('/profile', verifyToken, authorizeRoles)
router.post('/create-profile', verifyToken, authorizeRoles("shopkeeper"), createProfileController)
router.post('/create-sale', verifyToken, authorizeRoles("shopkeeper"), saleController)

// router.post('/login', loginController)

module.exports = router;