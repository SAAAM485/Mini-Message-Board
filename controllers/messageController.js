// controllers/messagesController.js
const db = require("../db/queries");

async function getMessages(req, res) {
    const messages = await db.getAllMessages();
    res.render("index", { title: "Mini Messageboard", messages: messages });
}

async function getMessagePage(req, res) {
    const messageId = req.params.id; // 使用 req.params.id 來獲取訊息 ID
    const message = await db.getMessage(messageId);
    if (message) {
        res.render("message", { message: message });
    } else {
        res.status(404).send("Message not found");
    }
}

function newMessage(req, res) {
    res.render("new");
}

async function addMessage(req, res) {
    const messageContent = req.body.content;
    const messageUsername = req.body.username;
    await db.insertMessage(messageUsername, messageContent);
    res.redirect("/");
}

module.exports = {
    getMessages,
    getMessagePage,
    newMessage,
    addMessage,
};
