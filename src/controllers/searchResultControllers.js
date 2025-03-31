const saleModel = require('../models/saleModel')

const searchByBrands = () => {

}


//search sale details bsed on Brands or category
const searchSale = async (req, res) => {
    const {brands, category} = req.body
    try {
        let query = {};
        if ( !brands && !category){
            return res.status(403).send("Please provide category or brands you want to search")

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

        const results = await saleModel.find(query)
        return res.send(results)

    } catch (error) {
        console.log(error)
    }

}

module.exports = { searchByBrands, searchSale }