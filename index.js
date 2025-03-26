const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const connectDB = require('./src/dbConnection')
// const shopkeeperRoutes = require('./src/routes/shopkeeperRoute')
const authRoutes = require('./src/routes/authRoutes')


const cors = require('cors')
app.use(cors())
connectDB();

app.get('/', (req, res) =>{
   return res.status(200).send("server is running");
})

app.use('/api', authRoutes)

app.listen(8080, ()=> {
    console.log('server is running on port 8080')
})