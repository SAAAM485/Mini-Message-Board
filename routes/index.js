const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messageController");

router.get("/", messagesController.getMessages);
router.get("/:id", messagesController.getMessagePage);

module.exports = router;
