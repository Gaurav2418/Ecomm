const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.authorization
    if(authHeader){
        const token = authHeader.split(" ")[1]   
        console.log(token)
        const decode = jwt.verify(token, process.env.jwt_secret)
        req.user = decode
        console.log(decode)
        next()
    }else{
        return res.status(403).send("Access Denied, No token found")
    }
}


module.exports = verifyToken;