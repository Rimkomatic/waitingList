const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

const MONGO_URL = process.env.MONGO_URL
// "mongodb+srv://rik:5FY5igaJdeRY6neI@waitingemail.5vxnk0p.mongodb.net/"
mongoose.connection.once("open" , ()=>{
    console.log("Database connected")
})

mongoose.connection.on("error" ,()=>{
    console.warn("Database connection error!!")
})

async function mongoConnect()
{
    await mongoose.connect( MONGO_URL ,{
        useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
        useUnifiedTopology: true
    } )
}

async function mongoDiconnect()
{
    await mongoose.disconnect()
}

module.exports={
    mongoConnect,
    mongoDiconnect
}