const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  about: {
    type: String,
    trim: true,
    required: true,
  },
  contact: {
    type: Number,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);
module.exports = Recruiter;
