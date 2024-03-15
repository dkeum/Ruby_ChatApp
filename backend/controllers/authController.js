const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

require('dotenv').config()

const { uniqueNamesGenerator,  names } = require("unique-names-generator");

// @ POST
// ROUTE: /signup
const signUp = asyncHandler(async (req, res) => {
  const { username, password, gender } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarMale = "https://avatar.iran.liara.run/public/boy";
  const avatarFemale = "https://avatar.iran.liara.run/public/girl";

  const config = {
    dictionaries: [names],
  };

  const firstName = uniqueNamesGenerator(config);
  const lastName = uniqueNamesGenerator(config);

  // Create new user
  const newUser = new User({
    firstName,
    lastName,
    username,
    password: hashedPassword,
    avatar: gender === "male" ? avatarMale : avatarFemale,
    gender,
  });

  await newUser.save();

  // Generate access token
  const accessToken = jwt.sign(
    {
      UserInfo: {
        userId: newUser._id.toString(),
        username: newUser.username,
        avatar: newUser.avatar,
        gender: newUser.gender

      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ accessToken });
});

// @ post
// ROUTE: /auth
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ username }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized! user not found" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match)
    return res.status(401).json({ message: "Unauthorized! password is wrong" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        userId: foundUser._id.toString(),
        username: foundUser.username,
        avatar: foundUser.avatar,
        gender: foundUser.gender
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send accessToken containing username and roles
  res.json({ accessToken });
});

// @ GET
// ROUTE: /refresh
const refresh = asyncHandler((req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const foundUser = await User.findOne({ username: decoded.username });

      if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    })
  );

  const accessToken = jwt.sign(
    {
      UserInfo: {
        userId: foundUser._id.toString(),
        username: foundUser.username,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ accessToken });
});

// @ POST
// ROUTE: /logout
const logout = asyncHandler((req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  res.clearCookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None",
  });
  res.json({ Message: "cookie cleared" });
});

module.exports = { login, refresh, logout, signUp };
