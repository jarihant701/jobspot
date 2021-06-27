import React from 'react';

import JobCard from './JobCard';
const SearchResults = ({ currentJobs }) => {
  return (
    <div className='job_listing'>
      {currentJobs.length > 0 ? (
        ''
      ) : (
        <p className='empty_state text-center'>
          {' '}
          'No jobs found. Try changing your search query'
        </p>
      )}
      {currentJobs.map((job, index) => {
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

export default SearchResults;
