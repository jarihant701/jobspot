const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');

const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  ugInstitute: String,
  ugDegree: String,
  ugMarks: Number,
  pgInstitute: String,
  pgDegree: String,
  pgMarks: Number,
  password: {
    type: String,
    required: true,
  },
});

const Applicant = mongoose.model('Applicant', applicantSchema);
module.exports = Applicant;
