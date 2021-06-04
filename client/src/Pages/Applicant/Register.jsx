import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => {
  return (
    <div className='form'>
      <h1>Register</h1>
      <Form>
        <Form.Group controlId='formBasicEmail' className='input-div'>
          <Form.Label>
            Name <span className='required'>*</span>{' '}
          </Form.Label>
          <Form.Control type='text' placeholder='Enter email' required />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>
        <Form.Group controlId='formBasicEmail' className='input-div'>
          <Form.Label>
            Email address <span className='required'>*</span>{' '}
          </Form.Label>
          <Form.Control type='email' placeholder='Enter email' required />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPassword' className='input-div'>
          <Form.Label>
            Password <span className='required'>*</span>
          </Form.Label>
          <Form.Control type='password' placeholder='Password' required />
        </Form.Group>
        <Button variant='primary' type='submit' className='input-submit'>
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
