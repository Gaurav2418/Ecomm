const express = require('express')
const router = express.Router()
const { registerController, loginController } = require('../controllers/auth')
const verifyToken = require('../../middlewares/verifyMiddleware')

router.get('/base', (req, res)=>{
    return res.send("hello user")
})

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/login', verifyToken, loginController)

module.exports = router;