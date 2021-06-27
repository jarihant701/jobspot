import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Search from '../../Components/Search';
import SearchResults from '../../Components/SearchResults';
import Paginate from '../../Components/Paginate';

const SearchJobs = () => {
  const { search } = useLocation();
  let { position, location } = queryString.parse(search);

  if (!position) position = '';
  if (!location) location = '';

  const [jobs, setJobs] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);

  useEffect(() => {
    const getSearchResults = async () => {
      const res = await fetch(
        `/api/jobpost/search?position=${position}&location=${location}`
      );
      const data = await res.json();
      setJobs([...data]);
    };
    getSearchResults();
  }, [position, location]);

  const indexOfLastjob = currentPage * jobsPerPage;
  const indexOfFirstjob = indexOfLastjob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstjob, indexOfLastjob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <div className='search_jobs'>
        <h1 className='mt-3 text-primary fs-3'>Search Jobs</h1>
        <Search />
      </div>
      <h2 className='home_heading'>
        Search Results (Showing {currentJobs.length} out of {jobs.length})
      </h2>
      <SearchResults currentJobs={currentJobs} />
      <Paginate
        jobsPerPage={jobsPerPage}
        totaljobs={jobs.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default SearchJobs;
