require('dotenv').config();

const express = require('express');
var cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

require('./db/connection');

const recruiterRoute = require('./routes/recruiterRoute');
const applicantRoute = require('./routes/applicantRoute');
const jobPostingRoute = require('./routes/jobPostingRoute');

app.use('/api/applicant/', applicantRoute);
app.use('/api/recruiter/', recruiterRoute);
app.use('/api/jobpost/', jobPostingRoute);

app.get('/api/logout', (req, res) => {
  try {
    res.clearCookie('authToken');
    res.status(200).json({ message: 'Logout successful' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Some error occured' });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
