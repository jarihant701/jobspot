import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Table from 'react-bootstrap/Table';

const ApplicantApplications = () => {
  const [applications, setApplications] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const getDetails = async () => {
      const res = await fetch('/api/applicant/my-applications', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.status >= 400) history.push('/applicant/login');
      setApplications(data);
    };
    getDetails();
  }, [history]);
  return (
    <div className='container py-5'>
      <h1 className='text-primary text-center fs-1'>My Applications</h1>
      <Table striped responsive bordered className='me-5'>
        <thead>
          <tr>
            <th>#</th>
            <th>Job Title</th>
            <th>Location</th>
            <th>Number of Applications</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{application.jobTitle}</td>
                <td>{application.location}</td>
                <td>{application.applications.length}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <p className='text-center fs-4 mt-3'>
        {applications.length < 1 ? 'You have not applied to any job' : null}
      </p>
    </div>
  );
};

export default ApplicantApplications;
