const mongoose = require("mongoose");

// Define the user schema
const roomSchema = new mongoose.Schema({
  roomName: { type: String, required: false },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

// Create the User model
const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
