require('dotenv').config()
const express = require("express");

const PORT = process.env.PORT || 3000;
const connectDB = require("./config/connectDb");
const cookieParser = require("cookie-parser");
const {app, server } = require('./socket/socket')
const cors = require("cors") 
const corsOptions = require("./config/corsOptions")

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/message", require("./routes/messageRoute"));
app.use("/api/user", require("./routes/userRoute"));



// TODOS: 
// payments with STRIPE, groupchats , VideoChat, teambuilding (Guess the word... other ideas ), arguings, livechatting
  



server.listen(PORT, () => {
    connectDB();
    console.log(`app is listening on PORT ${PORT}`);
  });

