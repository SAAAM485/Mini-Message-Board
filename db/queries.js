const pool = require("./pool");

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
}

async function insertMessage(username, content) {
    await pool.query(
        "INSERT INTO messages (username, content) VALUES ($1, $2)",
        [username, content]
    );
}

async function getMessage(id) {
    const { rows } = await pool.query(
        "SELECT * FROM messages WHERE id = ($1)",
        [id]
    );
    return rows[0];
}

module.exports = {
    getAllMessages,
    insertMessage,
    getMessage,
};
