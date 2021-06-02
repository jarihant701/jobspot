const mongoose = require('mongoose');

const DB_URI = process.env.DB;

// Connecting DB
mongoose.connect(
  DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Database connection successful')
);
