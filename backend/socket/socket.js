const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");

const {
  buildMsg,
  buildMsgWithAvatar,
  activateUser,
  userLeavesApp,
  getUser,
  getUsersinRoom,
  getAllActiveRooms,
} = require("./util/groupchat");

const {
  textChatactivateUser,
  textChatuserLeavesApp,
  textChatgetUser,
  textChatgetAllActiveRooms,
  textChatgetReceiverSocketId,
  textChatUserLeavesRoom,
  textChatUserRequeue,
  findTextChatUser,
  getRandomPerson,
  createUniqueRoom,
  updateTextChatUser, // Import the function
} = require("./util/textchat");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests only from port 5173
    credentials: false, // Allow sending cookies
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} is connected`);

  // GROUP CHAT

  socket.on("enterRoom", ({ name, room }) => {
    console.log(`${socket.id} has entered room ${room}`);
    //leave previous room
    const prevRoom = getUser(socket.id)?.room;
    if (prevRoom) {
      socket.leave(prevRoom);
      io.to(prevRoom).emit(
        "message",
        buildMsg("ADMIN", `${name} has left the room`)
      );
    }

    const user = activateUser(socket.id, name, room);

    if (prevRoom) {
      io.to(prevRoom).emit("userList", {
        users: getUsersinRoom(prevRoom),
      });

      socket.join(user.room);

      //to user who joined
      socket.emit(
        "message",
        buildMsg("ADMIN", `You have joined the ${user.room} chat room`)
      );

      //to everyone else
      socket.broadcast
        .to(user.room)
        .emit("message", buildMsg("ADMIN", `${user.name} has joined the room`));

      io.to(user.room).emit("userList", {
        users: getUsersinRoom(user.room),
      });

      // update room list for everything
      io.emit("roomlist", { rooms: getAllActiveRooms() });
    }
  });

  socket.on("message", (data) => {
    const incomingData = JSON.parse(data);
    console.log(incomingData);

    io.emit(
      "message",
      buildMsgWithAvatar(
        incomingData.name,
        incomingData.message,
        incomingData.avatar
      )
    );
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} is disconnected`);
    const user = getUser(socket.id);
    userLeavesApp(socket.id);
    textChatuserLeavesApp(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        buildMsg("ADMIN", `${user.name} has left the room`)
      );
      io.to(user.room).emit("userList", {
        users: getUsersinRoom(user.room),
      });
      io.emit("roomList", {
        rooms: getAllActiveRooms(),
      });
    }
  });

  socket.on("activity", (name) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      console.log("user is typing...");
      io.to(room).emit(
        "activity",
        JSON.stringify({
          name: "ADMIN",
          avatar: "temp",
          message: `${name} is typing`,
        })
      );
    }
  });

  // TEXT CHAT
  socket.on("enterTextChat", (data) => {
    const { name , avatar } = data;
    const room = null

    // add current user to the textchat array
    textChatactivateUser(socket, name, avatar, room );

    // check who's in the text chat array (not including current user)
    const receiver = getRandomPerson(socket.id);

    if (receiver) {
      // create a random unique room
      const uniqueRoom = createUniqueRoom();


      //both the users will join the room 
      updateTextChatUser(uniqueRoom, socket.id); // Fix here
      updateTextChatUser(uniqueRoom, receiver.id); // Fix here
      
      receiver.socket.join(uniqueRoom)
      socket.join(uniqueRoom);

      socket.emit(
        "enterTextChat", JSON.stringify({
            name: receiver.name , 
            avatar: receiver.avatar,
        }));

        receiver.socket.emit("enterTextChat", JSON.stringify({
            name,
            avatar 
        }));

      // socket.emit(
      //   "message",
      //   buildMsg("ADMIN", `You have joined the ${uniqueRoom} chat room`)
      // );


    } else {
      socket.emit("enterTextChat", null);
    }
  });

  socket.on("leaveTextChat", (data) => {
    // get the user
    const user = textChatgetUser(socket.id)
    // find the room 
    const room = user.room
    // find the person with the same room id
    const receiver = findTextChatUser(room, socket.id)
    // set the room to null 

    if(receiver){
      receiver.room = null
      receiver.socket.leave()
    }

    socket.leave(room)
    /// remove the current person from the textchat array
    textChatUserLeavesRoom(socket.id)
  });

  socket.on("requeueTextChat", (data) => {
    // set the current user socket to room: null
    updateTextChatUser(null, socket.id)
  });

});

module.exports = { app, server };
