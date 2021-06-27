import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import CheckRecruiter from '../../Components/CheckRecruiter';

const CreatePost = () => {
  const ugDegree = [
    'Bachelor of Arts.',
    'Bachelor of Science.',
    'Bachelor of Commerce.',
    'Bachelor of Engg./Tech.',
    'BMS/BBA/BBS.',
    'Bachelor of Law.',
    'Bachelor of Medicine (MBBS)',
    'IIM 5-year Integrated Mgmt. Programme.',
  ];

  const pgDegree = [
    'Master of Arts (MA)',
    'Master of Science (MS, MSc)',
    'Master of Research (MRes)',
    'Master by Research (MPhil)',
    'Master of Studies (MSt)',
    'Master of Business Administration (MBA)',
  ];
  const [input, setInput] = useState({});
  const [exp, setExp] = useState({});
  const [skill, setSkill] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (
      exp.maxExperience !== '10+' &&
      parseInt(exp.minExperience) >= parseInt(exp.maxExperience)
    ) {
      alert(
        'Minimum Experience can not be greater than or equal to maximum experience'
      );
      setExp({ minExperience: 'Minimum', maxExperience: 'Maximum' });
    }
    if (
      exp.minExperience !== undefined &&
      exp.maxExperience !== undefined &&
      exp.minExperience !== 'Minimum' &&
      exp.maxExperience !== 'Maximum'
    ) {
      const experience = exp.minExperience + '-' + exp.maxExperience;
      setInput((prev) => ({ ...prev, experience }));
    }

    if (skill !== '') {
      const skills = skill.split(',');
      setInput((prev) => ({ ...prev, skills }));
    }

    if (input.remote) setInput((prev) => ({ ...prev, location: 'Remote' }));

    if (!input.noofOpenings) setInput((prev) => ({ ...prev, noofOpenings: 1 }));
  }, [
    input.noofOpenings,
    exp.minExperience,
    exp.maxExperience,
    input.to,
    input.from,
    skill,
    history,
    input.remote,
  ]);

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleExperience = (e) => {
    setExp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSkills = (e) => {
    setSkill(e.target.value);
  };

  const cancelInput = () => {
    const answer = window.confirm(
      'Are you sure you want to abort creating post?'
    );
    if (answer) history.goBack();
  };

  const submitForm = async (e) => {
    e.preventDefault();
    var message = 'Cannot submit form because';
    if (!input.jobTitle)
      message = message + '\n\u2022 JobTitle can not be empty';
    if (!input.location && !input.remote)
      message = message + '\n\u2022 location can not be empty';
    if (!input.jobDesc)
      message = message + '\n\u2022 Job Description can not be empty';
    if (input.from >= input.to) {
      message =
        message + '\n\u2022 From can not be smaller than or equal to to';
      setInput((prev) => ({ ...prev, from: '', to: '' }));
    }
    if (!input.skills || input?.skills.length === 0)
      message = message + '\n\u2022 Required Skills can not be empty';
    if (message.length > 26) return alert(message);

    const res = await fetch('/api/jobpost/create', {
      method: 'POST',
      body: JSON.stringify({
        jobTitle: input?.jobTitle,
        description: input?.jobDesc,
        experience: input.experience || undefined,
        location: input?.location,
        skills: input?.skills,
        from: input?.from,
        to: input?.to,
        ugEducation: input?.ugEducation || undefined,
        pgEduccation: input.pgEducation || undefined,
        noOfOpenings: input.noofOpenings,
        applyBy: input.applyBy,
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    alert(data.message);
    if (res.status === 200) {
      history.push('/');
    }
  };

  return (
    <div className='create_job'>
      <CheckRecruiter />
      <Form>
        <h1 className='text-primary mb-3'>Create New Job Post</h1>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={2}>
            Job Title <span className='required'>*</span>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type='text'
              name='jobTitle'
              value={input?.jobTitle || ''}
              onChange={handleInput}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={2}>
            Job Location <span className='required'>*</span>
          </Form.Label>
          <Col sm={10}>
            <Row>
              <Col sm={8}>
                <Form.Control
                  type='text'
                  name='location'
                  value={input?.location || ''}
                  onChange={handleInput}
                  readOnly={input?.remote}
                />
              </Col>
              <Col sm={4}>
                <Form.Check
                  style={{ paddingTop: '5px' }}
                  type='checkbox'
                  label='Remote Position'
                  name='remote'
                  onChange={(e) => {
                    setInput((prev) => ({ ...prev, remote: e.target.checked }));
                  }}
                  value='myValue'
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={2}>
            Job Description <span className='required'>*</span>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as='textarea'
              rows={3}
              name='jobDesc'
              value={input?.jobDesc}
              onChange={handleInput}
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={2}>
            Experience Required (in Years)
          </Form.Label>
          <Col sm={5}>
            <select
              value={exp.minExperience}
              className='form-select'
              name='minExperience'
              onChange={handleExperience}
            >
              <option defaultValue='Minimum'>Minimum</option>
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </select>
            <Form.Text className='text-muted'>
              Leave Empty if no prior experience required
            </Form.Text>
          </Col>
          <Col sm={5}>
            <select
              value={exp.maxExperience}
              className='form-select'
              name='maxExperience'
              onChange={handleExperience}
            >
              <option defaultValue='Maximum'>Maximum</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
              <option value='10+'>10+</option>
            </select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={2}>
            Pay Range (in Rs)
          </Form.Label>
          <Col sm={5}>
            <Row>
              <Form.Label column sm={2}>
                From
              </Form.Label>
              <Col>
                <Form.Control
                  type='number'
                  min='0'
                  value={input.from || ''}
                  onChange={handleInput}
                  name='from'
                />
              </Col>
            </Row>
            <Form.Text className='text-muted'>
              Leave Empty if don't want to disclose
            </Form.Text>
          </Col>
          <Col sm={5}>
            <Row>
              <Form.Label column sm={2}>
                To
              </Form.Label>
              <Col>
                <Form.Control
                  type='number'
                  min='0'
                  value={input.to || ''}
                  onChange={handleInput}
                  name='to'
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={2}>
            Key Skills Required<span className='required'>*</span>
          </Form.Label>
          <Col sm={10}>
            <Form.Control type='text' value={skill} onChange={handleSkills} />
            <Form.Text>Seperate each skill by a comma</Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={2}>
            Educational Qualification
          </Form.Label>
          <Col sm={10}>
            <Form.Group as={Row} className='mb-1'>
              <Form.Label column sm={2}>
                Undergraduate
              </Form.Label>
              <Col sm={10}>
                <select
                  className='form-select'
                  value={input.ugEducation || ''}
                  onChange={handleInput}
                  name='ugEducation'
                >
                  <option defaultValue=''></option>
                  {ugDegree.map((degree, index) => (
                    <option value={degree} key={index}>
                      {degree}
                    </option>
                  ))}
                  <option value='Other'>Other</option>
                </select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm={2}>
                Postgraduate
              </Form.Label>
              <Col sm={10}>
                <select
                  className='form-select'
                  value={input.pgEducation || ''}
                  onChange={handleInput}
                  name='pgEducation'
                >
                  <option defaultValue=''></option>
                  {pgDegree.map((degree, index) => (
                    <option value={degree} key={index}>
                      {degree}
                    </option>
                  ))}
                  <option value='Other'>Other</option>
                </select>
              </Col>
              <Form.Text className='text-muted'>
                Leave Empty if no such preference
              </Form.Text>
            </Form.Group>
          </Col>
        </Form.Group>
        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm={4}>
                Apply By <span className='required'>*</span>
              </Form.Label>
              <Col sm={8}>
                <input
                  style={{ width: '100%' }}
                  type='date'
                  name='applyBy'
                  value={input.applyBy || ''}
                  onChange={handleInput}
                  min={new Date().toISOString().split('T')[0]}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Row>
              <Form.Label column sm={4}>
                No of Openings
              </Form.Label>
              <Col>
                <Form.Control
                  type='number'
                  min='1'
                  value={input.noofOpenings || 1}
                  onChange={handleInput}
                  name='noofOpenings'
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Form.Group className='mb-3 d-flex justify-content-between'>
          <Button variant='danger' className='me-3' onClick={cancelInput}>
            Cancel
          </Button>
          <Button
            variant='success'
            type='submit'
            className='mr-3'
            onClick={submitForm}
          >
            Create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreatePost;
