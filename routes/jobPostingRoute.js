const router = require('express').Router();
const Recruiter = require('../model/Recruiter');
const Applicant = require('../model/Applicant');
const JobPost = require('../model/JobPosting');
const auth = require('../middleware/auth');

router.post('/create', auth, async (req, res) => {
  try {
    const postedBy = req.user._id;
    const {
      jobTitle,
      description,
      experience,
      location,
      skills,
      from,
      to,
      ugEducation,
      pgEducation,
      noOfOpenings,
      applyBy,
    } = req.body;
    let payScale;
    if (from && to)
      payScale = from.toLocaleString('en') + '-' + to.toLocaleString('en');
    const recruiter = await Recruiter.findById(postedBy);
    if (!recruiter)
      return res.status(404).json({ message: 'Wrong Recruiter ID' });

    const newJob = new JobPost({
      postedBy,
      jobTitle,
      description,
      experience,
      location,
      skills,
      payScale,
      ugEducation,
      pgEducation,
      noOfOpenings,
      applyBy,
    });

    const jobSaved = await newJob.save();
    if (jobSaved)
      return res.status(200).json({ message: 'Job Posted Successfully' });
    res.status(500).json({ message: 'Some error occured' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: e });
  }
});

router.get('/recent', async (req, res) => {
  const results = await JobPost.find().limit(5).sort({ $natural: -1 });

  const jobs = await Promise.all(
    results.map(async (result) => {
      const recruiter = await Recruiter.findById(result.postedBy);
      const name = recruiter.name;
      const {
        _id,
        jobTitle,
        experience,
        payScale,
        location,
        description,
        skills,
      } = result;
      return {
        _id,
        jobTitle,
        experience,
        payScale,
        location,
        description,
        skills,
        name,
      };
    })
  );
  res.send(jobs);
});

router.get('/search', async (req, res) => {
  let { position, location } = req.query;
  const results = await JobPost.find({
    location: new RegExp(location, 'i'),
    jobTitle: new RegExp(position, 'i'),
  })
    .sort({ $natural: -1 })
    .lean();
  const jobs = await Promise.all(
    results.map(async (result) => {
      const recruiter = await Recruiter.findById(result.postedBy);
      const name = recruiter.name;
      return { ...result, name };
    })
  );
  res.send(jobs);
});

router.get('/get/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const jobPost = await JobPost.findById(id).lean().orFail();
    if (!jobPost) return res.status(404).json({ message: 'Page not found' });
    const recruiter = await Recruiter.findById(jobPost.postedBy)
      .lean()
      .orFail();
    const { name, about, industry } = recruiter;
    const result = { ...jobPost, name, about, industry };
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

router.put('/apply', auth, async (req, res) => {
  try {
    const { appliedTo } = req.body;
    const appliedBy = req.user._id;

    const jobPost = await JobPost.findById(appliedTo);
    const applicant = await Applicant.findById(appliedBy);
    if (!applicant) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    const ifAlreadyApplied = jobPost.applications.includes(appliedBy);
    if (ifAlreadyApplied) {
      return res.status(400).json({ message: 'Already Applied' });
    }

    jobPost.applications.push(appliedBy);
    jobPost.save();
    res.status(200).json({ message: 'Applied' });
  } catch (e) {
    res.status(400).json({ message: 'Error' });
    console.log(e);
  }
});

router.delete('/delete/:id', auth, async (req, res) => {
  const { id } = req.params;
  const jobPost = await JobPost.findByIdAndDelete(id);
  if (jobPost) res.json({ message: 'Job Post Deleted Successfully' });
});

router.get('/get-applicants/:id', auth, async (req, res) => {
  const { id } = req.params;
  const jobPost = await JobPost.findById(id);
  const { applications } = jobPost;
  const applicants = await Promise.all(
    applications.map(async (application) => {
      const res = await Applicant.findById(application).lean();
      return { ...res };
    })
  );
  res.status(200).send(applicants);
});

router.put('/remove-applicant', auth, async (req, res) => {
  try {
    const { remove, from } = req.body;
    const jobpost = await JobPost.findById(from);
    const { applications } = jobpost;
    const index = applications.indexOf(remove);
    if (index > -1) {
      applications.splice(index, 1);
    }
    await jobpost.save();
    res.status(200).json({ message: 'Successfully removed application' });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
