const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  companyDetails: {
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
    address: {
      type: String,
      trim: true,
      required: true,
    },
    contact: {
      type: Number,
      trim: true,
      required: true,
    },
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
  jobPosting: [
    {
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
    },
  ],
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);
