// controllers/messagesController.js
const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date(),
        id: 0,
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date(),
        id: 1,
    },
];

exports.getMessages = (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
};

exports.getMessagePage = (req, res) => {
    const messageId = req.params.id; // 使用 req.params.id 來獲取訊息 ID
    const message = messages.find((msg) => msg.id === parseInt(messageId));
    if (message) {
        res.render("message", { message: message });
    } else {
        res.status(404).send("Message not found");
    }
};

exports.newMessage = (req, res) => {
    res.render("new");
};

exports.addMessage = (req, res) => {
    const messageText = req.body.message;
    const messageUser = req.body.user;
    messages.push({
        text: messageText,
        user: messageUser,
        added: new Date(),
        id: messages.length,
    });
    res.redirect("/");
};
