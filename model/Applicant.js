const mongoose = require('mongoose');

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
  password: {
    type: String,
    required: true,
  },
  appliedTo: [
    {
      type: String,
    },
  ],
});

const Applicant = mongoose.model('Recruiter', applicantSchema);
