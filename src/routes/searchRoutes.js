const express = require("express")
const router = express.Router()
const { searchByBrands, searchSale } = require('../controllers/searchResultControllers')
const verifyToken = require("../../middlewares/verifyMiddleware")


router.get('/check', (req, res) => {
    res.send("check msg from search routes")
})

router.post('/search', verifyToken, searchSale)
module.exports = router;