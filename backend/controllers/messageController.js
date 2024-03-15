const Room = require("../models/Room");
const Message = require("../models/Message");
const asyncHandler = require("express-async-handler");
const { getReceiverSocketId, io } = require("../socket/socket.js");

// @ POST
// /api/message/send/:id
const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const { Id: receiverId } = req.params;
  const senderId = req.user.id;

  let room = await Room.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!room) {
    room = await Room.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });
  if (newMessage) {
    room.messages.push(newMessage._id);
  }

  new Promise.all([room.save(), newMessage.save()]);

  // SOCKET IO FUNCTIONALITY WILL GO HERE
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    // io.to(<socket_id>).emit() used to send events to specific client
    io.to(receiverSocketId).emit("message", newMessage);
  }

  res.status(201).json(newMessage);
});

// @ GET
// /api/message/:id
const getMessages = asyncHandler(async (req, res) => {
  const { Id: receiverId } = req.params;
  const senderId = req.user.id;

  const room = await Room.findOne({
    participants: { $all: [senderId, receiverId] },
  }).populate("messages");
  if (!room) {
    return res.status(200).json([]);
  }

  const messages = room.messages;
  res.status(200).json(messages);
});

module.exports = { sendMessage, getMessages };
