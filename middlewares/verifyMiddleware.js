const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    
    try {
        const authHeader = req.headers.authorization || req.headers.authorization
        if(authHeader){
            const token = authHeader.split(" ")[1]   
            // console.log(token)
            const decode = jwt.verify(token, process.env.jwt_secret)
            req.user = decode
            // console.log(decode)
            next()
        }else{
            return res.status(403).send("Access Denied, No token found")
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send("Something went wrong. Please try again later.")
    }
}


module.exports = verifyToken;