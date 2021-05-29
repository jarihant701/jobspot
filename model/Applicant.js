const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({});

const Applicant = mongoose.model('Recruiter', applicantSchema);
