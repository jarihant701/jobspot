import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

const JobDesc = () => {
  const { id, view } = useParams();
  const history = useHistory();
  const [job, setJob] = useState();
  useEffect(() => {
    const getJobDetails = async () => {
      const res = await fetch(`/api/jobpost/get/${id}`, {
        credentials: 'include',
        method: 'GET',
      });
      const data = await res.json();
      if (res.status === 404) history.push('/404');
      setJob(data);
    };

    getJobDetails();
  }, [id, history]);

  const applyJob = async () => {
    try {
      const res = await fetch('/api/jobpost/apply', {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify({
          appliedTo: id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.status === 401) history.push('/applicant/login');
      alert(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='job'>
      <div
        className='d-md-flex justify-content-md-between
      flex-md-row'
      >
        <div>
          <h1 className='job_title'>{job?.jobTitle}</h1>
          <h3 className='job_postedBy'>{job?.name}</h3>
          <h5 className='job_details'>
            {' '}
            <i className='fas fa-star'></i> {`${job?.experience} Years`}{' '}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <i className='fas fa-rupee-sign'></i>{' '}
            {job?.payScale === undefined
              ? 'Not Disclosed'
              : `${job.payScale} pa`}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <i className='fas fa-map-marker-alt'></i> {job?.location}
          </h5>
        </div>
        <div className='mx-2'></div>
        {view === 'job' ? (
          <div>
            <Button onClick={applyJob}>Apply</Button>
          </div>
        ) : null}
      </div>
      <article>
        <div>
          <h5>Company Profile</h5>
          <p>
            {job?.about.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        <div>
          <h5>Job Description</h5>
          <p>
            {job?.description.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        <div>
          <h5>Key Skills</h5>
          <p>
            {job?.skills.map((skill, index) => (
              <Badge key={index} className='bg-primary fs-6 me-2 mb-2' pill>
                {skill}
              </Badge>
            ))}
          </p>
        </div>
        <div>
          <h5>Education Qualifications</h5>
          <Table size='sm' borderless>
            <tbody>
              <tr>
                <th>UG</th>
                <td>{job?.ugEducation}</td>
              </tr>
              <tr>
                <th>PG</th>
                <td>{job?.pgEducation}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div>
          <h5>Additional Details</h5>
          <Table bordered size='sm'>
            <tbody>
              <tr>
                <th>Role</th>
                <td>{job?.jobTitle}</td>
              </tr>
              <tr>
                <th>Salary</th>
                <td>
                  {job?.payScale === undefined
                    ? 'Not Disclosed'
                    : `${job?.payScale.toLocaleString('en')} pa`}
                </td>
              </tr>
              <tr>
                <th>No of Openings</th>
                <td>{job?.noOfOpenings}</td>
              </tr>
              <tr>
                <th>Industry Type</th>
                <td>{job?.industry}</td>
              </tr>
              <tr>
                <th>Posted on</th>
                <td>{job?.dateofPosting.split('T')[0]}</td>
              </tr>
              <tr>
                <th>Apply By</th>
                <td>{job?.applyBy.split('T')[0]}</td>
              </tr>
              <tr>
                <th>No of Application(s)</th>
                <td>{job?.applications.length}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </article>
    </div>
  );
};

export default JobDesc;
