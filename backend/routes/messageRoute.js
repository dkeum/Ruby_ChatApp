

const express = require("express")
const router = express.Router()
const messageController = require('../controllers/messageController')
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)
router.get("/:id", messageController.getMessages)
    .post("/send/:id", messageController.sendMessage) //sender id in the params 


module.exports = router
