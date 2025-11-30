// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // for HTML form POST
app.use(bodyParser.json());

// create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'my_db',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// serve a simple HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

// receive form POST
app.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // basic validation
    if (!name || !email) {
      return res.status(400).send('Name and email are required.');
    }

    const sql = 'INSERT INTO users (name, email, message) VALUES (?, ?, ?)';
    const [result] = await pool.execute(sql, [name, email, message || null]);

    res.send(`Thanks! Saved with id ${result.insertId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on http://localhost:${port}`));
