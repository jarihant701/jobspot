import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';

const RecentJobs = () => {
  useEffect(() => {
    getRecentJobs();
  }, []);

  const [jobs, setJobs] = useState([]);

  const getRecentJobs = async () => {
    const res = await fetch('/api/jobpost/recent');
    const data = await res.json();
    setJobs(data);
  };

  return (
    <div className='home_div'>
      <h2 className='home_heading'>Recent Jobs</h2>
      <p className='text-center my-3 fs-5 fw-light'>
        {jobs.length > 0
          ? ''
          : 'Looks like no jobs are available. Check back later'}
      </p>
      {jobs.map((job, index) => {
        return (
          <JobCard
            key={index}
            _id={job._id}
            title={job.jobTitle}
            experience={job.experience}
            salary={job.payScale}
            location={job.location}
            about={job.description}
            company={job.name}
            skills={job.skills}
          />
        );
      })}
    </div>
  );
};

export default RecentJobs;
