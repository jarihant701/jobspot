const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  postedBy: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    trim: true,
    required: true,
  },
  duration: {
    type: Number,
    default: 0,
    required: true,
  },
  payScale: {
    type: Number,
  },
  skills: [
    {
      type: String,
    },
  ],
  payScale: {
    type: String,
    required: true,
  },
  noOfOpenings: {
    type: Number,
    required: true,
  },
  dateofPosting: {
    type: Date,
    default: Date.now(),
  },
  applyBy: {
    type: Date,
    required: true,
  },
  applications: [
    {
      type: String,
    },
  ],
});

const Recruiter = mongoose.model('Recruiter', jobPostSchema);
