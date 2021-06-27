import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ApplicantProfile = () => {
  const [application, setApplication] = useState({});
  const history = useHistory();
  useEffect(() => {
    const getInfo = async () => {
      const res = await fetch('/api/applicant/get-info', {
        credentials: 'include',
        method: 'GET',
      });
      const data = await res.json();
      if (res.status >= 400) history.push('/applicant/login');
      setApplication(data);
    };
    getInfo();
  }, [history]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setApplication((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const goBack = () => {
    if (window.confirm('Are you sure?')) history.goBack();
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/applicant/update', {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(application),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    alert(data.message);
    if (res.status === 200) setApplication(data.applicant);
  };

  return (
    <div className='applicant-profile'>
      <h1>Your Profile</h1>
      <Form>
        <Form.Group className='input-div my-3'>
          <Form.Label>
            Name <span className='required'>*</span>{' '}
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='John Doe'
            onChange={handleInput}
            name='name'
            value={application.name || ''}
          />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>
        <Form.Group className='input-div my-3'>
          <Form.Label>
            Email address <span className='required'>*</span>
          </Form.Label>
          <Form.Control
            type='email'
            placeholder='john@example.com'
            onChange={handleInput}
            name='email'
            value={application.email || ''}
          />
        </Form.Group>

        <Form.Group className='input-div my-3'>
          <Form.Label>Education</Form.Label>
          <Form.Group as={Row} className='mb-1'>
            <Form.Label column sm={1}>
              UG
            </Form.Label>
            <Col className='mb-1' sm={4}>
              <Form.Control
                type='text'
                name='ugInstitute'
                onChange={handleInput}
                value={application.ugInstitute || ''}
                placeholder='Institute Name'
              />
            </Col>
            <Col className='mb-1' sm={4}>
              <Form.Control
                type='text'
                name='ugDegree'
                onChange={handleInput}
                value={application.ugDegree || ''}
                placeholder='Degree Name'
              />
            </Col>
            <Col className='mb-1' sm={3}>
              <Form.Control
                type='number'
                name='ugMarks'
                onChange={handleInput}
                value={application.ugMarks || ''}
                min='0'
                max='100'
                placeholder='Marks'
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-1'>
            <Form.Label column sm={1}>
              PG
            </Form.Label>
            <Col className='mb-1' sm={4}>
              <Form.Control
                type='text'
                name='pgInstitute'
                onChange={handleInput}
                value={application.pgInstitute || ''}
                placeholder='Institute Name'
              />
            </Col>
            <Col className='mb-1' sm={4}>
              <Form.Control
                type='text'
                name='pgDegree'
                onChange={handleInput}
                value={application.pgDegree || ''}
                placeholder='Degree Name'
              />
            </Col>
            <Col className='mb-1' sm={3}>
              <Form.Control
                type='number'
                name='pgMarks'
                onChange={handleInput}
                value={application.pgMarks || ''}
                min='0'
                max='100'
                placeholder='Marks'
              />
            </Col>
          </Form.Group>
        </Form.Group>
        <div className='d-flex align-items-between'>
          <Button variant='danger' className='input-submit' onClick={goBack}>
            Go Back
          </Button>
          <Button
            variant='success'
            type='submit'
            className='input-submit ms-auto'
            onClick={updateProfile}
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ApplicantProfile;
