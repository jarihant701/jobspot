require('dotenv').config();

const express = require('express');
const app = express();

const PORT = 5000 || process.env.PORT;
const DB_URI = process.env.DB;

app.get('/', (req, res) => res.send('Hello World'));

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
