require("dotenv").config();
const { Client } = require("pg");

async function dropTable() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    try {
        await client.connect();
        console.log("Connected to the database.");

        // 執行 DROP TABLE 命令
        const dropTableQuery = "DROP TABLE IF EXISTS messages;";
        await client.query(dropTableQuery);
        console.log("Table 'messages' dropped successfully.");
    } catch (err) {
        console.error("Error executing DROP TABLE command:", err);
    } finally {
        await client.end();
        console.log("Disconnected from the database.");
    }
}

dropTable();
