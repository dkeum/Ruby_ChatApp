const express = require("express");
const http = require('http')

const app = express();
const server = http.createServer(app)
const { Server } = require("socket.io");
const { corsOptions } = require("../config/corsOptions");

const io = new Server(server, {
  cors: corsOptions,
});

const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {


    console.log(`${socket.id} is connected`);

  const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;
  
    socket.broadcast.emit(
      "message",
      JSON.stringify({
        name: "admin",
        avatar: "temp",
        message: "User is connected...",
      })
    );
    
    //small application (for larger we only want to update the user's friendlist)
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  
    socket.on("message", (data) => {
      const incomingData = JSON.parse(data);
      // console.log(incomingData);
      io.emit("message", JSON.stringify(incomingData));
    });
  
    socket.on("disconnect", () => {
      console.log(`${socket.id} is disconnected`);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  
    socket.on("activity", (name) => {
      console.log(`${socket.id} is ${name}`);
  
      socket.broadcast.emit(
        "activity",
        JSON.stringify({
          name: "admin",
          avatar: "temp",
          message: "User is typing...",
        })
      );
    });
  });

module.exports = {app, server,  getReceiverSocketId }