#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    content TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const SQL_CHECK_EXISTENCE = `
SELECT COUNT(*) FROM messages
WHERE username = $1 AND content = $2;`;

const SQL_INSERT_MESSAGE = `
INSERT INTO messages (username, content, timestamp)
VALUES ($1, $2, CURRENT_TIMESTAMP);`;

const MESSAGES = [
    { username: "Alice", content: "Hello, this is a message!" },
    { username: "Bob", content: "This is another message." },
    { username: "Charlie", content: "Yet another interesting message." },
];

async function main() {
    console.log("Seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    await client.connect();
    await client.query(SQL_CREATE_TABLE);

    for (const message of MESSAGES) {
        const res = await client.query(SQL_CHECK_EXISTENCE, [
            message.username,
            message.content,
        ]);
        if (parseInt(res.rows[0].count, 10) === 0) {
            await client.query(SQL_INSERT_MESSAGE, [
                message.username,
                message.content,
            ]);
        }
    }

    await client.end();
    console.log("Done");
}

main().catch((err) => console.error("Error executing script", err));
