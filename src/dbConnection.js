const mongoose = require('mongoose')
const EcommDB ="EcommDb"
const DB1 = "DB1"
const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.mongo_url_local}${EcommDB}`)
        // await mongoose.connect(`${process.env.mongo_server}${DB1}`)

        console.log(`connected to database ${mongoose.connection.host}`)
        
    }catch(error){
        console.log(error)
    }
};

module.exports = connectDB;
