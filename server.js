require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = 5000 || process.env.PORT;
const DB_URI = process.env.DB;

// Connecting DB
mongoose.connect(
  DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Database connection successful')
);

app.get('/', (req, res) => res.send('Hello World'));

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
