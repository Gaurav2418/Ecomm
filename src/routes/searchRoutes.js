const express = require("express")
const router = express.Router()
const { searchByBrands, searchSale, searchSaleByBannerClicks } = require('../controllers/searchResultControllers')
const verifyToken = require("../../middlewares/verifyMiddleware")


router.get('/check', (req, res) => {
    res.send("check msg from search routes")
})

router.post('/search', verifyToken, searchSale);
router.post('/search-sales-by-banner-clicks', verifyToken, searchSaleByBannerClicks);
module.exports = router;