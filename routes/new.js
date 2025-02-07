const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messageController");

router.get("/", messagesController.newMessage);
router.post("/", messagesController.addMessage);

module.exports = router;
