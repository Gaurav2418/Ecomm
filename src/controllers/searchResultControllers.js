const saleModel = require('../models/saleModel')

const searchByBrands = () => {

}


//search sale details bsed on Brands or category
const searchSale = async (req, res) => {
    const {brands, category} = req.body
    try {
        let query = {};
        if ( !brands && !category){
            // returning all the sales
            query = {};
        }
        
        // Add conditions to the query object only if they exist
        if (brands && category) {
            // If both 'brands' and 'category' are provided, search for both
            query = { brands, category };
        } else {
            // If only 'brands' or 'category' is provided, use only that condition
            if (brands) {
                query.brands = brands;
            }
            if (category) {
                query.category = category;
            }
        }

        // const results = await saleModel.find(query)
        const results = await saleModel.find(query).populate('shopProfile', 'address landmarks shopLocation').exec();
        console.log(results)
        return res.send(results)

    } catch (error) {
        console.log(error)
    }

}

// Search sale api on baner clicks
const searchSaleByBannerClicks = async (req, res) => {
    try {
        // Step 1: Get the keywords from the request body
        const { keywords } = req.body;  // Assuming the request body has the 'keywords' field

        if (!keywords) {
            return res.status(400).json({ message: "Keywords are required" });
        }

        // Step 2: Split the keywords into an array (e.g., by space or comma)
        const keywordArray = keywords.split(/\s+/);  // Splits by spaces, you can also split by commas if needed

        // Step 3: Build a query using $or to match any of the fields
        const query = {
            $or: [
                { product: { $in: keywordArray.map(keyword => new RegExp(keyword, 'i')) } },
                { brands: { $in: keywordArray.map(keyword => new RegExp(keyword, 'i')) } },
                { category: { $in: keywordArray.map(keyword => new RegExp(keyword, 'i')) } },
                { keywords: { $in: keywordArray.map(keyword => new RegExp(keyword, 'i')) } }
            ]
        };

        // Step 4: Perform the query on the Sale model
        const results = await saleModel.find(query);

        // Step 5: Return the results
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: "No matching sales found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }


}

module.exports = { searchByBrands, searchSale, searchSaleByBannerClicks }