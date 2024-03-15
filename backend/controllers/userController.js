const Room = require('../models/Room')
const Message = require("../models/Message")
const User = require("../models/User")
const asyncHandler = require('express-async-handler')



// @ GET
// /api/user/
const getUsersForSidebar = asyncHandler(async (req, res ) => {
    const {id} = req.user.id 

    const filteredUsers = await User.find({_id : {$ne: id}})

    return res.status(200).json({filteredUsers})


})



module.exports= {getUsersForSidebar}