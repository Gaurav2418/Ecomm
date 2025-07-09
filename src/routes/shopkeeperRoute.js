const express = require('express')
const router = express.Router()
const { registerController, loginController } = require('../controllers/auth')
const { paymentController, saleController, getProfileController, createProfileController } = require('../controllers/shopController')
const verifyToken = require('../../middlewares/verifyMiddleware')
const authorizeRoles = require('../../middlewares/roleMiddleware')
const { activatePlanController, checkPlanValidityController } = require('../plan activation/Subscription')

router.get('/base', (req, res)=>{
    return res.send("hello shopkeeper")
})

router.post('/profile', verifyToken, getProfileController)
// router.post('/profile', verifyToken, authorizeRoles)
router.post('/create-profile', verifyToken, authorizeRoles("shopkeeper"), createProfileController)
router.post('/create-sale', verifyToken, authorizeRoles("shopkeeper"), checkPlanValidityController, saleController)

router.post('/add-subscription', verifyToken, authorizeRoles("shopkeeper"), activatePlanController )
// router.post('/login', loginController)

module.exports = router;