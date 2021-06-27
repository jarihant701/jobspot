import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const MyPostings = () => {
  const [postings, setPostings] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getPostings();
  });
  const getPostings = async () => {
    const res = await fetch('/api/recruiter/my-postings', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await res.json();
    if (res.status >= 400) history.push('/recruiter/login');
    setPostings(data);
  };
  const deletePost = async (id, jobTitle) => {
    if (window.confirm(`Are you sure you want to delete ${jobTitle}`)) {
      try {
        const res = await fetch(`/api/jobpost/delete/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        const data = await res.json();
        alert(data.message);
        if (res.status === 200) getPostings();
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className='container py-5'>
      <h1 className='text-primary text-center fs-1'>My Applications</h1>
      <Table responsive striped bordered className='me-5'>
        <thead>
          <tr>
            <th>#</th>
            <th>Job Title</th>
            <th>No. of Applicantions</th>
            <th>View Applicants</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {postings.map((posting, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{posting.jobTitle}</td>
                <td>{posting.applications.length}</td>
                <td>
                  <Link to={`/applicants/${posting._id}`}>View Applicants</Link>
                </td>
                <td>
                  <Link to={`/view/${posting._id}`}>View</Link>
                </td>
                <td>
                  <Link
                    to=''
                    onClick={() => deletePost(posting._id, posting.jobTitle)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <p className='text-center fs-4 mt-3'>
        {postings.length < 1 ? 'You have not applied to any job' : null}
      </p>
    </div>
  );
};

export default MyPostings;
