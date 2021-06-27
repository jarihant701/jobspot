import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Register = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });
  const history = useHistory();
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      password,
      cpassword,
      ugInstitute,
      ugDegree,
      ugMarks,
      pgInstitute,
      pgDegree,
      pgMarks,
    } = input;
    //Validating Form Inputs
    if (!name || !email || !password || !cpassword)
      return alert('All Fields are compulsory');
    if (!emailRegex.test(email)) {
      setInput((prev) => ({
        ...prev,
        email: '',
        password: '',
        cpassword: '',
      }));
      return alert('Email is not valid');
    }

    if (!strongRegex.test(password)) {
      setInput((prev) => ({
        ...prev,
        password: '',
        cpassword: '',
      }));
      return alert('Your password is not strong');
    }

    if (password !== cpassword) {
      setInput((prev) => ({
        ...prev,
        email: '',
        password: '',
        cpassword: '',
      }));
      return alert("Password and Confirm Password Field doesn't match");
    }

    const res = await fetch('/api/applicant/register', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
        ugInstitute,
        ugDegree,
        ugMarks,
        pgInstitute,
        pgDegree,
        pgMarks,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    alert(json.message);
    if (res.status === 200) history.push('/applicant/login');
  };

  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      Alteast 8 characters long
      <br />
      Atleast 1 uppercase letter
      <br />
      Atleast 1 lowercase letter
      <br />
      Atleast 1 numeric character
      <br />
      Atleast 1 special character
      <br />
    </Tooltip>
  );

  return (
    <div className='form'>
      <h1>Register</h1>
      <Form>
        <Form.Group className='input-div'>
          <Form.Label>
            Name <span className='required'>*</span>{' '}
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='John Doe'
            onChange={handleInput}
            name='name'
            value={input.name}
          />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>
        <Form.Group className='input-div'>
          <Form.Label>
            Email address <span className='required'>*</span>
          </Form.Label>
          <Form.Control
            type='email'
            placeholder='john@example.com'
            onChange={handleInput}
            name='email'
            value={input.email}
          />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>

        <Form.Group className='input-div'>
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
                value={input.ugInstitute || ''}
                placeholder='Institute Name'
              />
            </Col>
            <Col className='mb-1' sm={4}>
              <Form.Control
                type='text'
                name='ugDegree'
                onChange={handleInput}
                value={input.ugDegree || ''}
                placeholder='Degree Name'
              />
            </Col>
            <Col className='mb-1' sm={3}>
              <Form.Control
                type='number'
                name='ugMarks'
                onChange={handleInput}
                value={input.ugMarks || ''}
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
                value={input.pgInstitute || ''}
                placeholder='Institute Name'
              />
            </Col>
            <Col className='mb-1' sm={4}>
              <Form.Control
                type='text'
                name='pgDegree'
                onChange={handleInput}
                value={input.pgDegree || ''}
                placeholder='Degree Name'
              />
            </Col>
            <Col className='mb-1' sm={3}>
              <Form.Control
                type='number'
                name='pgMarks'
                onChange={handleInput}
                value={input.pgMarks || ''}
                min='0'
                max='100'
                placeholder='Marks'
              />
            </Col>
          </Form.Group>
        </Form.Group>
        <Form.Group className='input-div'>
          <Form.Label>
            Password <span className='required'>*</span>
            <OverlayTrigger
              placement='right'
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Badge className='bg-primary ms-1'>
                <i className='fas fa-question'></i>
              </Badge>
            </OverlayTrigger>
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            onChange={handleInput}
            name='password'
            value={input.password}
          />
        </Form.Group>
        <Form.Group className='input-div'>
          <Form.Label>
            Confirm Password <span className='required'>*</span>
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password again'
            onChange={handleInput}
            name='cpassword'
            value={input.cpassword}
          />
        </Form.Group>
        <Button
          variant='primary'
          type='submit'
          className='input-submit'
          onClick={submitForm}
        >
          Register
        </Button>
      </Form>
      <p className='text-center mt-3'>
        Already have an account? <Link to='/applicant/login'>Login</Link>
      </p>
    </div>
  );
};

export default Register;
