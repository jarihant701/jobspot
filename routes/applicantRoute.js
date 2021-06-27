const router = require('express').Router();
const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
require('../db/connection');

const Applicant = require('../model/Applicant');
const JobPost = require('../model/JobPosting');

router.get('/check', auth, (req, res) => {
  if (req.user) return res.sendStatus(200);
  else res.sendStatus(401);
});

router.post('/register', async (req, res) => {
  const {
    name,
    email,
    password,
    ugInstitute,
    ugDegree,
    ugMarks,
    pgInstitute,
    pgDegree,
    pgMarks,
  } = req.body;

  // Validating inputs
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Fields cannot be empty' });

  // Check if user exists or nor
  const applicantExist = await Applicant.findOne({ email });
  if (applicantExist)
    return res.status(400).json({ message: 'Email already exist' });

  const newApplicant = new Applicant({
    name,
    email,
    password,
    ugInstitute,
    ugDegree,
    ugMarks,
    pgInstitute,
    pgDegree,
    pgMarks,
  });
  // HAshing passwords to store in db
  const hash = await bCrypt.hash(newApplicant.password, 10);
  newApplicant.password = hash;
  const applicantSaved = await newApplicant.save();

  // Generating JWT
  const token = jwt.sign({ _id: applicantSaved._id }, process.env.JWTSECRET);
  res.json({
    message: 'Data Saved Successfully',
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validating inputs
  if (!email || !password)
    return res.status(400).json({ message: 'Fields cannot be empty' });

  // Check if user exists or nor
  const applicantExist = await Applicant.findOne({ email });
  if (!applicantExist)
    return res.status(400).json({ message: 'User does not exist' });

  // Comparing plain password from req.body with hashed password
  const isMatch = await bCrypt.compare(password, applicantExist.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  // Generating JWT
  const token = jwt.sign({ _id: applicantExist._id }, process.env.JWTSECRET);
  res.cookie('authToken', token, { httpOnly: true });
  res.json({
    token,
    user: {
      _id: applicantExist._id,
      name: applicantExist.name,
      email: applicantExist.email,
    },
    message: 'User logged in Successfully',
  });
});

router.get('/my-applications', auth, async (req, res) => {
  const { _id } = req.user;
  const jobPost = await JobPost.find({
    applications: _id,
  });
  res.send(jobPost);
});

router.get('/get-info', auth, async (req, res) => {
  const { _id } = req.user;
  const applicant = await Applicant.findById(_id);
  const {
    name,
    email,
    ugDegree,
    ugInstitute,
    ugMarks,
    pgDegree,
    pgInstitute,
    pgMarks,
  } = applicant;
  res.status(200).send({
    name,
    email,
    ugDegree,
    ugInstitute,
    ugMarks,
    pgDegree,
    pgInstitute,
    pgMarks,
  });
});

router.patch('/update', auth, async (req, res) => {
  const { _id } = req.user;
  const applicant = await Applicant.findOneAndUpdate({ _id }, req.body, {
    new: true,
    useFindAndModify: false,
  });
  if (applicant)
    return res
      .status(200)
      .json({ message: 'Data updated successfully', applicant });
});

module.exports = router;
