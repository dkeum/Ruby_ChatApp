const express= require("express")
const cors = require("cors");
const {corOptions} = require("./config/corsOptions")

require('dotenv').config()
const app = express(corOptions)


app.use(cors()); // Enable CORS for all routes
app.use(express.json())


app.listen(process.env.BACKEND_PORT, ()=>{
    console.log(`listening on port ${process.env.BACKEND_PORT}`)
})