const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobPostSchema = new mongoose.Schema({
  postedBy: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  experience: {
    type: String,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  skills: [
    {
      type: String,
    },
  ],
  payScale: {
    type: String,
  },
  noOfOpenings: {
    type: Number,
    required: true,
  },
  dateofPosting: {
    type: Date,
    default: Date.now(),
  },
  ugEducation: {
    type: 'String',
    default: 'Any Graduate in Any Specialization',
  },
  pgEducation: {
    type: 'String',
    default: 'Any Postgraduate in Any Specialization',
  },
  applyBy: {
    type: Date,
    required: true,
  },
  applications: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
});

const JobPost = mongoose.model('JobPost', jobPostSchema);
module.exports = JobPost;
