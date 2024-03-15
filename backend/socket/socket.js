const express = require("express");
const http = require('http')

const app = express();
const server = http.createServer(app)
const { Server } = require("socket.io");
// const { corsOptions } = require("../config/corsOptions");

const io = new Server(server, {
  cors:{
    origin: 'http://localhost:5173', // Allow requests only from port 5173
    credentials: false, // Allow sending cookies
  },
});

const getReceiverSocketId = (receiverId) => {
  const user = userSocketMap.users.find(user => user.id === receiverId);
  if (user) {
    return user.id;
  } else {
    return null; // Return null if the receiver ID is not found
  }
};
const userSocketMap = {
  user: [],
  setUsers: function (newUsersArray){
    this.users = newUsersArray
  }

}; // {userId: socketId}

io.on("connection", (socket) => {


  console.log(`${socket.id} is connected`);

  

    socket.on("enterRoom", ({name, room})=>{
      //leave previous room 
      const prevRoom = getUser(socket.id)?.room
      if(prevRoom) {
        socket.leave(prevRoom)
        io.to(prevRoom).emit('message', buildMsg('ADMIN', `${name} has left the room`))
      }

      const user = activateUser(socket.id, name, room)
      
      if(prevRoom){
        io.to(prevRoom).emit('userList',{
          users:getUsersinRoom(prevRoom)
        })

        socket.join(user.room)

        //to user who joined
        socket.emit('message', buildMsg("ADMIN", `You have joined the ${user.room} chat room`))

        //to everyone else
        socket.broadcast.to(user.room).emit('message', buildMsg("ADMIN", `${user.name} has joined the room`))

        io.to(user.room).emit('userList', {
          users: getUsersInRoom(user.room)
        })

        // update room list for everything
        io.emit('roomlist', {rooms: getAllActiveRooms()})
    } })

    //small application (for larger we only want to update the user's friendlist)
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  
    socket.on("message", (data) => {
      const incomingData = JSON.parse(data);
      incomingData.time = buildMsg(incomingData.name, incomingData.message)
      // console.log(incomingData);

      io.emit("message", JSON.stringify(incomingData));
    });
  
    socket.on("disconnect", () => {
      console.log(`${socket.id} is disconnected`);
      const user = getUser(socket.id)
      userLeavesApp(socket.id)

      if(user){
        io.to(user.room).emit('message', buildMsg("ADMIN", `${user.name} has left the room`))
        io.to(user,room).emit('userList',{
          users: getUsersInRoom(user.room)
        })
        io.emit('roomList', {
          rooms:getAllActiveRooms()
        })
      }
    });
  
    socket.on("activity", (name) => {
      console.log(`${socket.id} is ${name}`);

      const room = getUser(socket.id)?.room
      if(room){
        io.to(room).emit('activity', name)
      }
  
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


function buildMsg(name, text){
  return {
    name,
    text, 
    time: new Intl.DateTimeFormat('default', {
      hour:'numeric',
      minute:'numeric',
      second: 'numeric'
    }).format(new Date())
  }
}

function activateUser(id, name, room){
  const user = {id, name, room}
  userSocketMap.setUsers([...UsersState.users.filter(user => user.id !== id), user])
  return user
}

function userLeavesApp(id){
  UsersState.setUsers(
    userSocketMap.users.filter(user => user.id !== id)
  )
}

function getUser(id){
  return userSocketMap.users.find(user => user.id === id )
}

function getUsersinRoom(id){
  return userSocketMap.users.find(user => user.room === room )
}

function getAllActiveRooms(){
  return Array.from(new Set(userSocketMap.users.map(user=>user.room)))
}

module.exports = {app, server,  getReceiverSocketId }