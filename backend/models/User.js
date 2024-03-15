const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: false },
  avatar:  { type: String, required: false },
  gender: { type: String, enum: ["male", "female", "others"], required: true }, // Enumerating gender values
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
