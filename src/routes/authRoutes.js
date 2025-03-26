const express = require('express')
const router = express.Router()
const { registerController, loginController } = require('../controllers/auth')

router.get('/base', (req, res)=>{
    return res.send("hello user")
})

router.post('/register', registerController)
router.post('/login', loginController)

module.exports = router;