const router = require('express').Router();
const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
require('../db/connection');

const Recruiter = require('../model/Recruiter');
const JobPost = require('../model/JobPosting');

router.get('/check', auth, async (req, res) => {
  if (req.user) {
    const recruiter = await Recruiter.findById(req.user.id);
    if (recruiter) return res.sendStatus(200);
  } else res.sendStatus(401);
});
0;

router.post('/register', async (req, res) => {
  try {
    const { name, about, contact, email, industry, password } = req.body;

    // Validating inputs
    if (!name || !about || !contact || !email || !industry || !password)
      return res.status(400).json({ message: 'Fields cannot be empty' });

    // Check if user exists or nor
    const recruiterExist = await Recruiter.findOne({ email });
    if (recruiterExist)
      return res.status(400).json({ message: 'Email already exist' });

    const newRecruiter = new Recruiter({
      name,
      about,
      contact,
      email,
      industry,
      password,
    });
    // HAshing passwords to store in db
    const hash = await bCrypt.hash(newRecruiter.password, 10);
    newRecruiter.password = hash;
    const recruiterSaved = await newRecruiter.save();

    // Generating JWT
    const token = jwt.sign({ _id: recruiterSaved._id }, process.env.JWTSECRET);
    res.json({
      token,
      user: {
        _id: recruiterSaved._id,
        name: recruiterSaved.name,
        email: recruiterSaved.email,
      },
      message: 'Data Saved Successfully',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validating inputs
  if (!email || !password)
    return res.status(400).json({ message: 'Fields cannot be empty' });

  // Check if user exists or nor
  const recruiterExist = await Recruiter.findOne({ email });
  if (!recruiterExist)
    return res.status(400).json({ message: 'User does not exist' });

  // Comparing plain password from req.body with hashed password
  const isMatch = await bCrypt.compare(password, recruiterExist.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  // Generating JWT
  const token = jwt.sign({ _id: recruiterExist._id }, process.env.JWTSECRET);
  res.cookie('authToken', token, { httpOnly: true });
  res.json({
    token,
    user: {
      _id: recruiterExist._id,
      name: recruiterExist.name,
      email: recruiterExist.email,
    },
    message: 'User logged in Successfully',
  });
});

router.get('/my-postings', auth, async (req, res) => {
  try {
    const { _id } = req.user;
    const jobpost = await JobPost.find({ postedBy: _id }).sort({
      $natural: -1,
    });
    res.status(200).send(jobpost);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get('/get-info', auth, async (req, res) => {
  const { _id } = req.user;
  const recruiter = await Recruiter.findById(_id);
  const { name, about, email, industry, contact } = recruiter;
  res.status(200).send({ name, about, email, industry, contact });
});

router.patch('/update', auth, async (req, res) => {
  const { _id } = req.user;
  const recruiter = await Recruiter.findOneAndUpdate({ _id }, req.body, {
    new: true,
    useFindAndModify: false,
  });
  if (recruiter)
    return res
      .status(200)
      .json({ message: 'Data updated successfully', recruiter });
});

module.exports = router;
