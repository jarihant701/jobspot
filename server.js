require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB;

require('./db/connection');

app.get('/', (req, res) => res.send('Hello World'));

const recruiterRoute = require('./routes/recruiterRoute');
const applicantRoute = require('./routes/applicantRoute');
const jobPostingRoute = require('./routes/jobPostingRoute');

app.use('/api/applicant', applicantRoute);
app.use('/api/recruiter', recruiterRoute);
// app.use('/api/jobpost/', jobPostingRoute);

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
