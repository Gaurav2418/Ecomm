const mongoose = require('mongoose')
const EcommDB ="EcommDb"

const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.mongo_url_local}${EcommDB}`)
        console.log(`connected to database ${mongoose.connection.host}`)
        
    }catch(error){
        console.log(error)
    }
};

module.exports = connectDB;
