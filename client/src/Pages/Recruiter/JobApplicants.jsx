import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const JobApplicants = () => {
  const { id } = useParams();
  const history = useHistory();
  const [details, setDetails] = useState([]);
  useEffect(() => {
    getApplications();
  });
  const getApplications = async () => {
    const res = await fetch(`/api/jobpost/get-applicants/${id}`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (res.status >= 400) history.push('recruiter/login');
    else setDetails(data);
  };
  const removeApplicant = async (remove, from) => {
    const res = await fetch('/api/jobpost/remove-applicant', {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ remove, from }),
    });
    const data = await res.json();
    alert(data.message);
    if (res.status === 200) getApplications();
  };
  return (
    <div className='container py-5'>
      <h1 className='text-primary text-center fs-1'>Job Applicants</h1>
      <Table striped bordered responsive className='me-5'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>UG Degree</th>
            <th>PG Degree</th>
            <th>Remove Application</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{detail.name}</td>
                <td>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href={`mailto:${details.email}`}
                  >
                    {detail.email}
                  </a>
                </td>
                <td>{detail.ugDegree}</td>
                <td>{detail.pgDegree}</td>
                <td>
                  <Link to='#!' onClick={() => removeApplicant(detail._id, id)}>
                    Remove Application
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <p className='text-center fs-4 mt-3'>
        {details.length < 1 ? 'There are no applications for this job' : null}
      </p>
    </div>
  );
};

export default JobApplicants;
