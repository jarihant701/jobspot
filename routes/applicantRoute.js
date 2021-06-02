const router = require('express').Router();
const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
require('../db/connection');
// const mongoose = require('mongoose');

const Applicant = require('../model/Applicant');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

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
  });
  // HAshing passwords to store in db
  const hash = await bCrypt.hash(newApplicant.password, 10);
  newApplicant.password = hash;
  const applicantSaved = await newApplicant.save();

  // Generating JWT
  const token = jwt.sign({ _id: applicantSaved._id }, process.env.JWTSECRET);
  res.json({
    token,
    user: {
      _id: applicantSaved._id,
      name: applicantSaved.name,
      email: applicantSaved.email,
    },
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
    return res.status(400).json({ error: 'User does not exist' });

  // Comparing plain password from req.body with hashed password
  const isMatch = await bCrypt.compare(password, applicantExist.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  // Generating JWT
  const token = jwt.sign({ _id: applicantExist._id }, process.env.JWTSECRET);
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

module.exports = router;
